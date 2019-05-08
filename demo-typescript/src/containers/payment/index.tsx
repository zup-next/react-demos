import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { find, map } from 'lodash'
import { Content, Product, Detail, PaymentMethodList } from './styled'
import { PageTitle, Button, Center } from '../../components/commons.styled'
import { Link, RouteComponentProps } from 'react-router-dom'
import PaymentMethod from './PaymentMethod'
import {
  Resource,
  isPristine,
  isLoading,
  hasLoadError,
  isCreating,
  hasCreateSuccess,
  hasCreateError,
} from '@zup-it/redux-resource'
import { Movie, Catalog, Wallet, Order, PaymentMethod as PaymentType, ReduxState } from 'types'

type RouteProps = RouteComponentProps<{ id: string }>

interface ComponentProps {
  loadCatalog: () => void,
  loadWallet: () => void,
  createOrder: (order: Order) => void,
  resetOrderStatus: () => void,
  movie: Resource<Movie>,
  wallet: Resource<Wallet>,
  order: Resource<void>,
}

type Props = ComponentProps & RouteProps

interface State  {
  selectedPaymentMethod: PaymentType,
}

class Home extends PureComponent<Props, State> {

  constructor(props: Props) {
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

  selectPaymentMethod = (paymentMethod: PaymentType) =>
    this.setState({ selectedPaymentMethod: paymentMethod })

  placeOrder = () => {
    const { createOrder, movie } = this.props
    const { selectedPaymentMethod } = this.state

    createOrder({ productId: movie.data!.id, payment: selectedPaymentMethod })
  }

  renderLoading = () => <Content>Loading...</Content>

  renderLoadError = () => <Content>Error!</Content>

  renderOrderProgress = () => <Content>Please, wait while we process your order...</Content>

  renderOrderError = () => {
    const { resetOrderStatus } = this.props

    return (
      <Content>
        <p>Sorry. We could not process your order. Please, try again later.</p>
        <Button onClick={resetOrderStatus}>Try again</Button>
      </Content>
    )
  }

  renderOrderSuccess = () => {
    const { wallet } = this.props

    return (
      <Content>
        <p>Congratulations! You have acquired a new Title!!!</p>
        <p>Expect to receive a download link in your inbox in the next few minutes.</p>
        <p>Thank you for buying with us. Your current balance is ${wallet.data!.balance}</p>
        <p><Link to="/"><Button>Go back to catalog</Button></Link></p>
      </Content>
    )
  }

  renderContent = () => {
    const { movie, wallet } = this.props
    const { title, price } = movie.data!
    const { balance, cards } = wallet.data!
    const { selectedPaymentMethod: selected } = this.state

    return (
      <Content>
        <PageTitle>Order Summary</PageTitle>
        <Product>Item: {title}</Product>
        <Detail>Order total: ${price}</Detail>
        <Detail>Choose a payment method:</Detail>
        <PaymentMethodList>
          <PaymentMethod
            label="Balance"
            value={`$${balance}`}
            selected={selected.type === 'balance'}
            onClick={() => this.selectPaymentMethod({ type: 'balance' })}
          />
          {map(cards, card => (
            <PaymentMethod
              key={card.id}
              label={card.brand}
              value={`**** **** **** ${card.number}`}
              selected={selected.type === 'card' && selected.id === card.id}
              onClick={() => this.selectPaymentMethod({ type: 'card', id: card.id })}
            />
          ))}
        </PaymentMethodList>
        <Center><Button onClick={this.placeOrder}>Place order</Button></Center>
      </Content>
    )
  }

  render() {
    const { movie, wallet, order } = this.props

    if (isPristine(movie) || isPristine(wallet)) return null
    if (isLoading(movie) || isLoading(wallet)) return this.renderLoading()
    if (hasLoadError(movie) || hasLoadError(wallet)) return this.renderLoadError()
    if (isCreating(order)) return this.renderOrderProgress()
    if (hasCreateError(order)) return this.renderOrderError()
    if (hasCreateSuccess(order)) return this.renderOrderSuccess()

    return this.renderContent()
  }

}

const findMovieById = (catalog: Catalog | null, id: string) =>
  find(catalog, { id: parseInt(id) }) || null

const mapStateToProps = ({ catalog, wallet, order }: ReduxState, ownProps: RouteProps) => ({
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

export default connect(mapStateToProps, actions)(Home)
