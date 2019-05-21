import { AnyAction } from 'redux'
import { valueof } from './types'

declare module 'react-redux' {
  function useSelector<T>(selector: (state: T) => valueof<T>, equalityFn?: (state: T) => boolean): valueof<T>
  function useDispatch(): (action: AnyAction) => void
}
