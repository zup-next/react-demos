import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { HeaderBar, HeaderContent, Top, Bottom } from './styled'
import { isPristine, isLoading, hasLoadError } from '@zup-it/redux-resource'

class Header extends PureComponent {

  componentDidMount() {
    const { loadProfile, loadWallet } = this.props
    loadProfile()
    loadWallet()
  }

  renderLoading = () => <HeaderBar><HeaderContent>Loading...</HeaderContent></HeaderBar>

  renderError = () => <HeaderBar><HeaderContent>Error!</HeaderContent></HeaderBar>

  renderContent = (profile, balance) => (
    <HeaderBar>
      <HeaderContent>
        <Top>{profile.name} {profile.lastname}</Top>
        <Bottom>{profile.email}</Bottom>
      </HeaderContent>
      <HeaderContent>
        <Top>Saldo disponível:</Top>
        <Bottom>${balance}</Bottom>
      </HeaderContent>
    </HeaderBar>
  )

  render() {
    const { profile, wallet } = this.props

    if (isPristine(profile) || isPristine(wallet)) return null
    if (isLoading(profile) || isLoading(wallet)) return this.renderLoading()
    if (hasLoadError(profile) || hasLoadError(wallet)) return this.renderError()

    return this.renderContent(profile.data, wallet.data.balance)
  }

}

const mapStateToProps = ({ wallet, profile }) => ({ wallet, profile })
const actions = {
  loadWallet: resources.wallet.actions.load,
  loadProfile: resources.profile.actions.load,
}

export default connect(mapStateToProps, actions)(Header)
