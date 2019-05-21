import React, { useEffect, useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import useResource from '../../hooks/useResource'
import resources from '../../store/resources'
import { find } from 'lodash'
import { RouteComponentProps } from 'react-router-dom'
import { Loading, LoadError, OrderProgress, OrderError, OrderSuccess } from './components/feedback'
import Summary from './components/Summary'
import {
  isPristine,
  isLoading,
  hasLoadError,
  isCreating,
  hasCreateSuccess,
  hasCreateError,
} from '@zup-it/redux-resource'
import { Catalog, Wallet, Order, PaymentMethod as PaymentType } from 'types'

type Props = RouteComponentProps<{ id: string }>

const findMovieById = (catalog: Catalog | null, id: string) =>
  find(catalog, { id: parseInt(id) }) || null

const Payment: FC<Props> = (props) => {
  const [selectedPaymentMethod, selectPaymentMethod] = useState<PaymentType>({ type: 'balance' })
  const catalog = useResource<Catalog>('catalog')
  const wallet = useResource<Wallet>('wallet')
  const order = useResource('order')
  const movie = findMovieById(catalog.data, props.match.params.id)
  const dispatch = useDispatch()
  const resetOrderStatus = () => dispatch(resources.order.actions.resetCreateStatus())

  useEffect(() => {
    dispatch(resources.catalog.actions.load())
    dispatch(resources.wallet.actions.load())

    return resetOrderStatus
  }, [])

  if (isPristine(catalog) || isPristine(wallet)) return null
  if (isLoading(catalog) || isLoading(wallet)) return <Loading />
  if (hasLoadError(catalog) || hasLoadError(wallet)) return <LoadError />
  if (isCreating(order)) return <OrderProgress />
  if (hasCreateError(order)) return <OrderError resetOrderStatus={resetOrderStatus} />
  if (hasCreateSuccess(order)) return <OrderSuccess balance={wallet.data!.balance} />

  return (
    <Summary
      movie={movie!}
      wallet={wallet.data!}
      selectedPaymentMethod={selectedPaymentMethod}
      selectPaymentMethod={selectPaymentMethod}
      createOrder={(order: Order) => dispatch(resources.order.actions.create(order))}
    />
  )
}

export default Payment
