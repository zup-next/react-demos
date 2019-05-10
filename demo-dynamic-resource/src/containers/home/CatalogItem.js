import React from 'react'
import { Item, Title, Poster, Details, Text } from './styled'

const MovieDetails = ({ poster, description, year, price }) => (
  <Details>
    <Poster src={poster} />
    <Text>
      <p>{description}</p>
      <p>Year: {year}</p>
      <p>Price: {price}</p>
    </Text>
  </Details>
)

const CatalogItem = ({ title, load, isLoading, hasError, details }) => (
  <Item>
    <Title onClick={load}>{title}</Title>
    {isLoading && <p>Loading...</p>}
    {hasError && <p>Error!</p>}
    {!hasError && details && <MovieDetails {...details} />}
  </Item>
)

export default CatalogItem
