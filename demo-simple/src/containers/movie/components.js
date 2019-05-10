import React from 'react'
import { Link } from 'react-router-dom'
import { Poster, MovieData, Description } from './styled'
import { Content, PageTitle, Button } from '../../components/commons.styled'

export const Loading = () => <Content>Loading...</Content>

export const Error = () => <Content>Error!</Content>

export const MovieDetails = ({ poster, title, year, description, id, price }) => (
  <Content>
    <Poster src={poster} />
    <MovieData>
      <PageTitle>{title} ({year})</PageTitle>
      <Description>{description}</Description>
      <Link to={`/payment/${id}`}>
        <Button>Buy for ${price}</Button>
      </Link>
    </MovieData>
  </Content>
)
