import React from 'react'
import { PaymentContainer, PaymentLabel, PaymentValue } from './styled'

const PaymentMethod = ({ label, value, selected, onClick }) => (
  <PaymentContainer selected={selected} onClick={onClick}>
    <PaymentLabel>{label}</PaymentLabel>
    <PaymentValue>{value}</PaymentValue>
  </PaymentContainer>
)

export default PaymentMethod
