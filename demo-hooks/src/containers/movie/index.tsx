import React, { FC, useMemo, memo } from 'react'
import { useResource } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'
import { find } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Loading, Error, MovieDetails } from './components'
import { Catalog } from 'types'

type Props = RouteComponentProps<{ id: string }>

const findMovieById = (catalog: Catalog | null, id: string) =>
  find(catalog, { id: parseInt(id) }) || null

const Movie: FC<Props> = (props) => {
  const catalog = useResource('catalog')
  const movie = findMovieById(catalog.data, props.match.params.id)
  const dispatch = useDispatch()

  useMemo(() => dispatch(resources.catalog.actions.load()), [])

  if (isPristine(catalog)) return null
  if (isLoading(catalog)) return <Loading />
  if (hasLoadError(catalog)) return <Error />

  return <MovieDetails {...movie!} />
}

export default memo(Movie)
