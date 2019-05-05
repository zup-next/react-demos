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

  renderContent = () => {
    const { profile, wallet } = this.props
    const { name, lastname, email } = profile.data
    const { balance } = wallet.data

    return (
      <HeaderBar>
        <HeaderContent>
          <Top>{name} {lastname}</Top>
          <Bottom>{email}</Bottom>
        </HeaderContent>
        <HeaderContent>
          <Top>Available balance:</Top>
          <Bottom>${balance}</Bottom>
        </HeaderContent>
      </HeaderBar>
    )
  }

  render() {
    const { profile, wallet } = this.props

    if (isPristine(profile) || isPristine(wallet)) return null
    if (isLoading(profile) || isLoading(wallet)) return this.renderLoading()
    if (hasLoadError(profile) || hasLoadError(wallet)) return this.renderError()

    return this.renderContent()
  }

}

const mapStateToProps = ({ wallet, profile }) => ({ wallet, profile })
const actions = {
  loadWallet: resources.wallet.actions.load,
  loadProfile: resources.profile.actions.load,
}

export default connect(mapStateToProps, actions)(Header)
