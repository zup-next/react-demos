import { Resource } from '@zup-it/redux-resource'

export interface Profile {
  name: string,
  lastname: string,
  title?: string,
  gender?: string,
  address?: string,
  city?: string,
  province?: string,
  country?: string,
  phone?: string,
  email: string,
}

export interface CreditCard {
  id: number,
  brand: string,
  number: string,
}

export interface Wallet {
  balance: number,
  cards: Array<CreditCard>,
}

export interface Movie {
  id: number,
  title: string,
  year: number,
  description: string,
  price: number,
  poster: string,
}

export type Catalog = Array<Movie>

interface BalancePaymentMethod {
  type: 'balance',
}

interface CardPaymentMethod {
  type:'card',
  id: number,
}

export type PaymentMethod = BalancePaymentMethod | CardPaymentMethod

export interface Order {
  productId: number,
  payment: PaymentMethod,
}

export interface ApiError {
  message: string,
  status?: number,
  data?: any,
}

export interface ReduxState {
  profile: Resource<Profile>,
  wallet: Resource<Wallet>,
  catalog: Resource<Catalog>,
  order: Resource<void>,
}
