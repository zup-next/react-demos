import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { Resource, isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'
import { find } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Loading, Error, MovieDetails } from './components'
import { Movie as MovieType, Catalog, ReduxState } from 'types'

type RouteProps = RouteComponentProps<{ id: string }>

interface ComponentProps {
  loadCatalog: () => void,
  movie: Resource<MovieType>,
}

type Props = ComponentProps & RouteProps

class Movie extends PureComponent<Props> {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  render() {
    const { movie } = this.props

    if (isPristine(movie)) return null
    if (isLoading(movie)) return <Loading />
    if (hasLoadError(movie)) return <Error />

    return <MovieDetails {...movie.data!} />
  }

}

const findMovieById = (catalog: Catalog | null, id: string) =>
  find(catalog, { id: parseInt(id) }) || null

const mapStateToProps = ({ catalog }: ReduxState, ownProps: RouteProps) => ({
  movie: { ...catalog, data: findMovieById(catalog.data, ownProps.match.params.id) },
})

const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Movie)
