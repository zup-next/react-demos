import React, { FC, useMemo, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useResource } from '../../hooks/redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { Catalog, Loading, Error } from './components'

const Home: FC = () => {
  const catalog = useResource('catalog')
  const dispatch = useDispatch()

  useMemo(() => dispatch(resources.catalog.actions.load()), [])

  if (isPristine(catalog)) return null
  if (isLoading(catalog)) return <Loading />
  if (hasLoadError(catalog)) return <Error />

  return <Catalog catalog={catalog.data!} />
}

export default memo(Home)
