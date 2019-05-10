import React from 'react'
import { map } from 'lodash'
import { Content, Product, Detail, PaymentMethodList } from '../styled'
import { PageTitle, Button, Center } from '../../../components/commons.styled'
import PaymentMethod from './PaymentMethod'
import { Movie, Wallet, Order, PaymentMethod as PaymentType } from 'types'

type Props = {
  movie: Movie,
  wallet: Wallet,
  selectedPaymentMethod: PaymentType,
  selectPaymentMethod: (paymentMethod: PaymentType) => void,
  createOrder: (order: Order) => void,
}

const Summary = ({ movie, wallet, selectedPaymentMethod, selectPaymentMethod, createOrder }: Props) => (
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

export default Summary
