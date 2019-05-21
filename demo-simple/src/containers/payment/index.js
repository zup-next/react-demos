import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { find } from 'lodash'
import { Loading, LoadError, OrderProgress, OrderError, OrderSuccess } from './components/feedback'
import Summary from './components/Summary'
import {
  isPristine,
  isLoading,
  hasLoadError,
  isCreating,
  hasCreateSuccess,
  hasCreateError,
} from '@zup-next/redux-resource'

class Payment extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { selectedPaymentMethod: { type: 'balance' } }
  }

  componentDidMount() {
    const { loadCatalog, loadWallet } = this.props
    loadCatalog()
    loadWallet()
  }

  componentWillUnmount() {
    const { resetOrderStatus } = this.props
    resetOrderStatus()
  }

  selectPaymentMethod = paymentMethod =>
    this.setState({ selectedPaymentMethod: paymentMethod })

  render() {
    const { movie, wallet, order, resetOrderStatus, createOrder } = this.props
    const { selectedPaymentMethod } = this.state

    if (isPristine(movie) || isPristine(wallet)) return null
    if (isLoading(movie) || isLoading(wallet)) return <Loading />
    if (hasLoadError(movie) || hasLoadError(wallet)) return <LoadError />
    if (isCreating(order)) return <OrderProgress />
    if (hasCreateError(order)) return <OrderError resetOrderStatus={resetOrderStatus} />
    if (hasCreateSuccess(order)) return <OrderSuccess balance={wallet.data.balance} />

    return (
      <Summary
        movie={movie.data}
        wallet={wallet.data}
        selectedPaymentMethod={selectedPaymentMethod}
        selectPaymentMethod={this.selectPaymentMethod}
        createOrder={createOrder}
      />
    )
  }

}

const findMovieById = (catalog, id) => find(catalog, { id: parseInt(id) }) || null

const mapStateToProps = ({ catalog, wallet, order }, ownProps) => ({
  movie: { ...catalog, data: findMovieById(catalog.data, ownProps.match.params.id) },
  wallet,
  order,
})

const actions = {
  loadCatalog: resources.catalog.actions.load,
  loadWallet: resources.wallet.actions.load,
  createOrder: resources.order.actions.create,
  resetOrderStatus: resources.order.actions.resetCreateStatus,
}

export default connect(mapStateToProps, actions)(Payment)
