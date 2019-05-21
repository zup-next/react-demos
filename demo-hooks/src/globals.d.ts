import { AnyAction } from 'redux'

declare module 'react-redux' {
  function useSelector(selector: (state: any) => any, equalityFn?: (state: any) => boolean): any
  function useDispatch(): (action: AnyAction) => void
}
