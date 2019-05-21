import { useSelector } from 'react-redux'
import { Resource } from '@zup-it/redux-resource'
import { ReduxState } from '../types'

export function useResource<T> (resourceName: keyof ReduxState): Resource<T> {
  return useSelector((state: ReduxState) => state[resourceName])
}
