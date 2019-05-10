import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { Catalog, Loading, Error } from './components'


class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  render() {
    const { catalog } = this.props

    if (isPristine(catalog)) return null
    if (isLoading(catalog)) return <Loading />
    if (hasLoadError(catalog)) return <Error />

    return <Catalog catalog={catalog.data} />
  }

}

const mapStateToProps = ({ catalog }) => ({ catalog })
const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
