import React, { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import useResource from '../../hooks/useResource'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { Catalog, Loading, Error } from './components'
import { Catalog as CatalogType } from 'types'

const Home: FC = () => {
  const catalog = useResource<CatalogType>('catalog')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resources.catalog.actions.load())
  }, [])

  if (isPristine(catalog)) return null
  if (isLoading(catalog)) return <Loading />
  if (hasLoadError(catalog)) return <Error />

  return <Catalog catalog={catalog.data!} />
}

export default Home
