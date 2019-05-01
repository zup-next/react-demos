import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import Movie from './Movie'
import { List } from './styled'
import { Content, PageTitle, Center } from '../../components/commons.styled'
import { map } from 'lodash'

class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  renderLoading = () => <Content>Loading...</Content>

  renderError = () => <Content>Error!</Content>

  renderContent = movies => (
    <Content>
      <Center><PageTitle>Catalog</PageTitle></Center>
      <List>
        {map(movies, movie => <Movie key={movie.id} {...movie} />)}
      </List>
    </Content>
  )

  render() {
    const { catalog } = this.props

    if (isPristine(catalog)) return null
    if (isLoading(catalog)) return this.renderLoading()
    if (hasLoadError(catalog)) return this.renderError()

    return this.renderContent(catalog.data)
  }

}

const mapStateToProps = ({ catalog }) => ({ catalog })
const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
