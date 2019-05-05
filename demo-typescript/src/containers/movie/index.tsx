import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { Resource, isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { find } from 'lodash'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Poster, MovieData, Description } from './styled'
import { Content, PageTitle, Button } from '../../components/commons.styled'
import { Movie, Catalog, ReduxState } from 'types'

type RouteProps = RouteComponentProps<{ id: string }>

interface ComponentProps {
  loadCatalog: () => void,
  movie: Resource<Movie>,
}

type Props = ComponentProps & RouteProps

class MovieDetails extends PureComponent<Props> {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  renderLoading = () => <Content>Loading...</Content>

  renderError = () => <Content>Error!</Content>

  renderContent = () => {
    const { movie } = this.props
    const { poster, title, year, description, id, price } = movie.data

    return (
      <Content>
        <Poster src={poster} />
        <MovieData>
          <PageTitle>{title} ({year})</PageTitle>
          <Description>{description}</Description>
          <Link to={`/payment/${id}`}>
            <Button>Buy for ${price}</Button>
          </Link>
        </MovieData>
      </Content>
    )
  }

  render() {
    const { movie } = this.props

    if (isPristine(movie)) return null
    if (isLoading(movie)) return this.renderLoading()
    if (hasLoadError(movie)) return this.renderError()

    return this.renderContent()
  }

}

const findMovieById = (catalog: Catalog | null, id: string) =>
  find(catalog, { id: parseInt(id) }) || null

const mapStateToProps = ({ catalog }: ReduxState, ownProps: RouteProps) => ({
  movie: { ...catalog, data: findMovieById(catalog.data, ownProps.match.params.id) },
})

const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(MovieDetails)
