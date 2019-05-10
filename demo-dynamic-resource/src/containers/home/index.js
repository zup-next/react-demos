import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { Content, PageTitle, CatalogList } from './styled'
import { map } from 'lodash'
import CatalogItem from './CatalogItem'

const Loading = () => <Content>Loading...</Content>

const Error = () => <Content>Error!</Content>

const Catalog = ({ catalog, movies, loadMovie }) => (
  <Fragment>
    <PageTitle>Movie catalog</PageTitle>
    <CatalogList>
      {map(catalog, item => (
        <CatalogItem
          key={item.id}
          title={item.title}
          load={() => loadMovie(item.id)}
          isLoading={isLoading(movies[item.id])}
          hasError={hasLoadError(movies[item.id])}
          details={movies[item.id] && movies[item.id].data}
        />
      ))}
    </CatalogList>
  </Fragment>
)

class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  render() {
    const { catalog, movies, loadMovie } = this.props

    console.log(movies)

    if (isPristine(catalog)) return null
    if (isLoading(catalog)) return <Loading />
    if (hasLoadError(catalog)) return <Error />

    return <Catalog catalog={catalog.data} movies={movies} loadMovie={loadMovie} />
  }

}

const mapStateToProps = ({ catalog, movies }) => ({ catalog, movies })
const actions = {
  loadCatalog: resources.catalog.actions.load,
  loadMovie: resources.movies.actions.load,
}

export default connect(mapStateToProps, actions)(Home)
