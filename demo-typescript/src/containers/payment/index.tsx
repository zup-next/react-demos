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

const Loading = () => <Content>Loading...</Content>

const LoadError = () => <Content>Error!</Content>

const OrderProgress = () => <Content>Please, wait while we process your order...</Content>

const OrderError = ({ resetOrderStatus }: { resetOrderStatus: () => void }) => (
  <Content>
    <p>Sorry. We could not process your order. Please, try again later.</p>
    <Button onClick={resetOrderStatus}>Try again</Button>
  </Content>
)

const OrderSuccess = ({ balance }: { balance: Number }) => (
  <Content>
    <p>Congratulations! You have acquired a new Title!!!</p>
    <p>Expect to receive a download link in your inbox in the next few minutes.</p>
    <p>Thank you for buying with us. Your current balance is ${balance}</p>
    <p><Link to="/"><Button>Go back to catalog</Button></Link></p>
  </Content>
)

type SummaryProps = {
  movie: Movie,
  wallet: Wallet,
  selectedPaymentMethod: PaymentType,
  selectPaymentMethod: (paymentMethod: PaymentType) => void,
  createOrder: (order: Order) => void,
}

const Summary = ({ movie, wallet, selectedPaymentMethod, selectPaymentMethod, createOrder }: SummaryProps) => (
  <Content>
    <PageTitle>Order Summary</PageTitle>
    <Product>Item: {movie.title}</Product>
    <Detail>Order total: ${movie.price}</Detail>
    <Detail>Choose a payment method:</Detail>
    <PaymentMethodList>
      <PaymentMethod
        label="Balance"
        value={`$${wallet.balance}`}
        selected={selectedPaymentMethod.type === 'balance'}
        onClick={() => selectPaymentMethod({ type: 'balance' })}
      />
      {map(wallet.cards, card => (
        <PaymentMethod
          key={card.id}
          label={card.brand}
          value={`**** **** **** ${card.number}`}
          selected={selectedPaymentMethod.type === 'card' && selectedPaymentMethod.id === card.id}
          onClick={() => selectPaymentMethod({ type: 'card', id: card.id })}
        />
      ))}
    </PaymentMethodList>
    <Center>
      <Button onClick={() => createOrder({ productId: movie.id, payment: selectedPaymentMethod })}>
        Place order
      </Button>
    </Center>
  </Content>
)

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

  render() {
    const { movie, wallet, order, resetOrderStatus, createOrder } = this.props
    const { selectedPaymentMethod } = this.state

    if (isLoading(movie) || isLoading(wallet)) return <Loading />
    if (hasLoadError(movie) || hasLoadError(wallet)) return <LoadError />
    if (movie.data === null || wallet.data === null) return null
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
