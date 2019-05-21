import styled from 'styled-components'
import { Content as CommonContent } from '../../components/commons.styled'

interface PaymentContainerProps {
  selected: boolean,
}

export const Content = styled(CommonContent)`
  max-width: 600px;
`

export const Product = styled.div`
  padding: 15px 10px;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid #AAA;
  border-bottom: 1px solid #AAA;
`

export const Detail = styled.p`
  font-size: 13px;
  padding: 0 10px;
`

export const PaymentMethodList = styled.ul`
  list-style: none;
  margin: 0 0 20px 0;
  padding: 0;
`

export const PaymentContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px;
  font-size: 13px;
  border-top: 1px solid #666;
  cursor: pointer;
  background-color: ${({ selected }: PaymentContainerProps) => selected ? '#713DC6' : 'auto'};

  &:last-child {
    border-bottom: 1px solid #666;
  }
`

export const PaymentLabel = styled.p`
  margin: 0;
`

export const PaymentValue = styled.p`
  font-weight: bold;
  margin: 0;
`
