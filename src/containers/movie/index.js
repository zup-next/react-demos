import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { find } from 'lodash'
import { Content, Poster, MovieData, Title, Description, BuyButton } from './styled'

class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  renderLoading = () => <Content>Loading...</Content>

  renderError = () => <Content>Error!</Content>

  renderContent = movie => (
    <Content>
      <Poster src={movie.poster} />
      <MovieData>
        <Title>{movie.title} ({movie.year})</Title>
        <Description>{movie.description}</Description>
        <BuyButton>Buy for ${movie.price}</BuyButton>
      </MovieData>
    </Content>
  )

  render() {
    const { catalog, match: { params: { id } } } = this.props

    if (isPristine(catalog)) return null
    if (isLoading(catalog)) return this.renderLoading()
    if (hasLoadError(catalog)) return this.renderError()

    return this.renderContent(find(catalog.data, { id: parseInt(id, 10) }))
  }

}

const mapStateToProps = ({ catalog }) => ({ catalog })
const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
