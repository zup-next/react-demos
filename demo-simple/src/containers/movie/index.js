import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { find } from 'lodash'
import { Link } from 'react-router-dom'
import { Poster, MovieData, Description } from './styled'
import { Content, PageTitle, Button } from '../../components/commons.styled'

class Home extends PureComponent {

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

const mapStateToProps = ({ catalog }, { match: { params: { id } } }) => ({
  movie: { ...catalog, data: find(catalog.data, { id: parseInt(id) }) },
})

const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
