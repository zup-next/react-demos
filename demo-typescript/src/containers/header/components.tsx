import React from 'react'
import { HeaderBar, HeaderContent, Top, Bottom } from './styled'
import { Profile, Wallet } from 'types'

export const Loading = () => <HeaderBar><HeaderContent>Loading...</HeaderContent></HeaderBar>

export const Error = () => <HeaderBar><HeaderContent>Error!</HeaderContent></HeaderBar>

interface Props {
  name: string,
  lastname: string,
  email: string,
  balance: number,
}

export const HeaderInfo = ({ name, lastname, email, balance }: Props) => {
  return (
    <HeaderBar>
      <HeaderContent>
        <Top>{name} {lastname}</Top>
        <Bottom>{email}</Bottom>
      </HeaderContent>
      <HeaderContent>
        <Top>Available balance:</Top>
        <Bottom>${balance}</Bottom>
      </HeaderContent>
    </HeaderBar>
  )
}
