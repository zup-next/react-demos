import React, { FC, useMemo, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useResource } from '../../hooks/redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'
import { Loading, Error, HeaderInfo } from './components'

const Header: FC = () => {
  const profile = useResource('profile')
  const wallet = useResource('wallet')
  const dispatch = useDispatch()

  useMemo(() => {
    dispatch(resources.profile.actions.load())
    dispatch(resources.wallet.actions.load())
  }, [])

  if (isPristine(profile) || isPristine(wallet)) return null
  if (isLoading(profile) || isLoading(wallet)) return <Loading />
  if (hasLoadError(profile) || hasLoadError(wallet)) return <Error />

  const { name, lastname, email } = profile.data!
  const { balance } = wallet.data!

  return <HeaderInfo name={name} lastname={lastname} email={email} balance={balance} />
}

export default memo(Header)
