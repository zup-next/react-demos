import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { Resource } from '@zup-it/redux-resource'
import { forEach } from 'lodash'
import { ReduxState } from '../types'

export function useResource<T> (resourceName: keyof ReduxState): Resource<T> {
  return useSelector((state: ReduxState) => state[resourceName])
}

export function dispatchOnStart(actions: AnyAction[] | AnyAction) {
  const [shouldDispatchOnStart, setShouldDispatchOnStart] = useState(true)
  const dispatch = useDispatch()

  if(shouldDispatchOnStart) {
    if (Array.isArray(actions)) forEach(actions, dispatch)
    else dispatch(actions)
    setShouldDispatchOnStart(false)
  }
}
