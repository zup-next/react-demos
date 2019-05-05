import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { Resource, isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import Movie from './Movie'
import { List } from './styled'
import { Content, PageTitle, Center } from '../../components/commons.styled'
import { map } from 'lodash'
import { Catalog, ReduxState } from 'types'

interface Props {
  loadCatalog: () => void,
  catalog: Resource<Catalog>,
}

class Home extends PureComponent<Props> {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  renderLoading = () => <Content>Loading...</Content>

  renderError = () => <Content>Error!</Content>

  renderContent = () => {
    const { catalog } = this.props
  
    return (
      <Content>
        <Center><PageTitle>Catalog</PageTitle></Center>
        <List>
          {map(catalog.data, movie => <Movie key={movie.id} {...movie} />)}
        </List>
      </Content>
    )
  }

  render() {
    const { catalog } = this.props

    if (isPristine(catalog)) return null
    if (isLoading(catalog)) return this.renderLoading()
    if (hasLoadError(catalog)) return this.renderError()

    return this.renderContent()
  }

}

const mapStateToProps = ({ catalog }: ReduxState) => ({ catalog })
const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
