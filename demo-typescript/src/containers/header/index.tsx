import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { Resource, isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'
import { Loading, Error, HeaderInfo } from './components'
import { Profile, Wallet, ReduxState } from 'types'

interface Props {
  loadProfile: () => void,
  loadWallet: () => void,
  profile: Resource<Profile>,
  wallet: Resource<Wallet>,
}

class Header extends PureComponent<Props> {

  componentDidMount() {
    const { loadProfile, loadWallet } = this.props
    loadProfile()
    loadWallet()
  }

  render() {
    const { profile, wallet } = this.props

    if (isPristine(profile) || isPristine(wallet)) return null
    if (isLoading(profile) || isLoading(wallet)) return <Loading />
    if (hasLoadError(profile) || hasLoadError(wallet)) return <Error />

    const { name, lastname, email } = profile.data!
    const { balance } = wallet.data!

    return <HeaderInfo name={name} lastname={lastname} email={email} balance={balance} />

  }

}

const mapStateToProps = ({ wallet, profile }: ReduxState) => ({ wallet, profile })
const actions = {
  loadWallet: resources.wallet.actions.load,
  loadProfile: resources.profile.actions.load,
}

export default connect(mapStateToProps, actions)(Header)
