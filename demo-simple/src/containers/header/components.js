import React from 'react'
import { HeaderBar, HeaderContent, Top, Bottom } from './styled'

export const Loading = () => <HeaderBar><HeaderContent>Loading...</HeaderContent></HeaderBar>

export const Error = () => <HeaderBar><HeaderContent>Error!</HeaderContent></HeaderBar>

export const HeaderInfo = ({ name, lastname, email, balance }) => {
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
