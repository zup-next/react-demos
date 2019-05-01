import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { find, map } from 'lodash'
import { Content, Product, Detail, PaymentMethodList } from './styled'
import { PageTitle, Button, Center } from '../../components/commons.styled'
import { Link } from 'react-router-dom'
import PaymentMethod from './PaymentMethod'
import {
  isPristine,
  isLoading,
  hasLoadError,
  isCreating,
  hasCreateSuccess,
  hasCreateError,
} from '@zup-it/redux-resource'

class Home extends PureComponent {

  state = { selectedPaymentMethod: 'balance' }

  componentDidMount() {
    const { loadCatalog, loadWallet } = this.props
    loadCatalog()
    loadWallet()
  }

  componentWillUnmount() {
    const { resetOrderStatus } = this.props
    resetOrderStatus()
  }

  selectPaymentMethod = paymentMethod => this.setState({ selectedPaymentMethod: paymentMethod })

  placeOrder = () => {
    const { createOrder, movie } = this.props
    const { selectedPaymentMethod } = this.state
    const payment = selectedPaymentMethod === 'balance'
      ? { type: 'balance' }
      : { type: 'card', id: selectedPaymentMethod }

    createOrder({ productId: movie.data.id, payment })
  }

  renderLoading = () => <Content>Loading...</Content>

  renderLoadError = () => <Content>Error!</Content>

  renderOrderProgress = () => <Content>Please, wait while we process your order...</Content>

  renderOrderError = resetOrderStatus => (
    <Content>
      <p>Sorry. We could not process your order. Please, try again later.</p>
      <Button onClick={resetOrderStatus}>Try again</Button>
    </Content>
  )

  renderOrderSuccess = balance => (
    <Content>
      <p>Congratulations! You have acquired a new Title!!!</p>
      <p>Expect to receive a download link in your inbox in the next few minutes.</p>
      <p>Thank you for buying with us. Your current balance is ${balance}</p>
      <p><Link to="/"><Button>Go back to catalog</Button></Link></p>
    </Content>
  )

  renderContent = (movie, wallet, selected) => (
    <Content>
      <PageTitle>Order Summary</PageTitle>
      <Product>Item: {movie.title}</Product>
      <Detail>Order total: ${movie.price}</Detail>
      <Detail>Choose a payment method:</Detail>
      <PaymentMethodList>
        <PaymentMethod
          label="Balance"
          value={`$${wallet.balance}`}
          selected={selected === 'balance'}
          onClick={() => this.selectPaymentMethod('balance')}
        />
        {map(wallet.cards, card => (
          <PaymentMethod
            key={card.id}
            label={card.brand}
            value={`**** **** **** ${card.number}`}
            selected={selected === card.id}
            onClick={() => this.selectPaymentMethod(card.id)}
          />
        ))}
      </PaymentMethodList>
      <Center><Button onClick={this.placeOrder}>Place order</Button></Center>
    </Content>
  )

  render() {
    const { movie, wallet, order, resetOrderStatus } = this.props
    const { selectedPaymentMethod } = this.state

    if (isPristine(movie) || isPristine(wallet)) return null
    if (isLoading(movie) || isLoading(wallet)) return this.renderLoading()
    if (hasLoadError(movie) || hasLoadError(wallet)) return this.renderLoadError()
    if (isCreating(order)) return this.renderOrderProgress()
    if (hasCreateError(order)) return this.renderOrderError(resetOrderStatus)
    if (hasCreateSuccess(order)) return this.renderOrderSuccess(wallet.data.balance)

    return this.renderContent(movie.data, wallet.data, selectedPaymentMethod)
  }

}

const mapStateToProps = ({ catalog, wallet, order }, { match: { params: { id } } }) => ({
  movie: { ...catalog, data: find(catalog.data, { id: parseInt(id) }) },
  wallet,
  order,
})

const actions = {
  loadCatalog: resources.catalog.actions.load,
  loadWallet: resources.wallet.actions.load,
  createOrder: resources.order.actions.create,
  resetOrderStatus: resources.order.actions.resetCreateStatus,
}

export default connect(mapStateToProps, actions)(Home)
