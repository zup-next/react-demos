import React from 'react'
import { Item, Title, Price, List } from './styled'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import { Content, PageTitle, Center } from '../../components/commons.styled'

export const Loading = () => <Content>Loading...</Content>

export const Error = () => <Content>Error!</Content>

const MovieItem = ({ id, title, year, poster, price }) => (
  <Item>
    <Link to={`/movie/${id}`}>
      <img alt={title} src={poster} />
      <Title>{title} ({year})</Title>
      <Price>${price}</Price>
    </Link>
  </Item>
)

export const Catalog = ({ catalog }) => (
  <Content>
    <Center><PageTitle>Catalog</PageTitle></Center>
    <List>
      {map(catalog, movie => <MovieItem key={movie.id} {...movie} />)}
    </List>
  </Content>
)
