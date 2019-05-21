import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'
import { find } from 'lodash'
import { Loading, Error, MovieDetails } from './components'

class Movie extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  render() {
    const { movie } = this.props

    if (isPristine(movie)) return null
    if (isLoading(movie)) return <Loading />
    if (hasLoadError(movie)) return <Error />

    return <MovieDetails {...movie.data} />
  }

}

const findMovieById = (catalog, id) => find(catalog, { id: parseInt(id) }) || null

const mapStateToProps = ({ catalog }, ownProps) => ({
  movie: { ...catalog, data: findMovieById(catalog.data, ownProps.match.params.id) },
})

const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Movie)
