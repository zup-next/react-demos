import React from 'react'
import { PaymentContainer, PaymentLabel, PaymentValue } from '../styled'

interface Props {
  label: string,
  value: string,
  selected: boolean,
  onClick: () => void,
}

const PaymentMethod = ({ label, value, selected, onClick }: Props) => (
  <PaymentContainer selected={selected} onClick={onClick}>
    <PaymentLabel>{label}</PaymentLabel>
    <PaymentValue>{value}</PaymentValue>
  </PaymentContainer>
)

export default PaymentMethod
