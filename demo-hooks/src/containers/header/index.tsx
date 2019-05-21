import React, { FC } from 'react'
import { useResource, dispatchOnStart } from '../../hooks/redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { Loading, Error, HeaderInfo } from './components'
import { Profile, Wallet } from 'types'

const Header: FC = () => {
  const profile = useResource<Profile>('profile')
  const wallet = useResource<Wallet>('wallet')

  dispatchOnStart([
    resources.profile.actions.load(),
    resources.wallet.actions.load()
  ])

  if (isPristine(profile) || isPristine(wallet)) return null
  if (isLoading(profile) || isLoading(wallet)) return <Loading />
  if (hasLoadError(profile) || hasLoadError(wallet)) return <Error />

  const { name, lastname, email } = profile.data!
  const { balance } = wallet.data!

  return <HeaderInfo name={name} lastname={lastname} email={email} balance={balance} />
}

export default Header
