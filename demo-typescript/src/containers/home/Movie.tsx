import React from 'react'
import { Item, Title, Price } from './styled'
import { Link } from 'react-router-dom'
import { Movie as MovieType } from 'types'

const Movie = ({ id, title, year, poster, price }: MovieType) => (
  <Item>
    <Link to={`/movie/${id}`}>
      <img alt={title} src={poster} />
      <Title>{title} ({year})</Title>
      <Price>${price}</Price>
    </Link>
  </Item>
)

export default Movie
