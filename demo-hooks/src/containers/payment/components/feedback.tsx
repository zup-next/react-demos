import React from 'react'
import { Content } from '../styled'
import { Button } from '../../../components/commons.styled'
import { Link } from 'react-router-dom'

export const Loading = () => <Content>Loading...</Content>

export const LoadError = () => <Content>Error!</Content>

export const OrderProgress = () => <Content>Please, wait while we process your order...</Content>

export const OrderError = ({ resetOrderStatus }: { resetOrderStatus: () => void }) => (
  <Content>
    <p>Sorry. We could not process your order. Please, try again later.</p>
    <Button onClick={resetOrderStatus}>Try again</Button>
  </Content>
)

export const OrderSuccess = ({ balance }: { balance: Number }) => (
  <Content>
    <p>Congratulations! You have acquired a new Title!!!</p>
    <p>Expect to receive a download link in your inbox in the next few minutes.</p>
    <p>Thank you for buying with us. Your current balance is ${balance}</p>
    <p><Link to="/"><Button>Go back to catalog</Button></Link></p>
  </Content>
)
