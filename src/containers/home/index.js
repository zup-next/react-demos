import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isLoading, hasLoadError } from '@zup-it/redux-resource'
import { map } from 'lodash'

class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  render() {
    const { catalog } = this.props
    if (isLoading(catalog)) return <p>Loading...</p>
    if (hasLoadError(catalog)) return <p>Error!</p>
    if (catalog.data === null) return null

    return map(catalog.data, movie => <p key={movie.id}>{movie.title}</p>)
  }

}

const mapStateToProps = ({ catalog }) => ({ catalog })
const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
