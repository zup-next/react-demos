import React from 'react'
import { Item, Title, Price } from './styled'
import { Link } from 'react-router-dom'

const CatalogItem = ({ title, onClick, isLoading, details }) => (
  <Item>
    <Title onClick={onClick} isLoading={isLoading}>{title}</Title>
    {details && <Details>
      <Poster src={details.poster} />
      <Text>
        <p>{details.description}</p>
        <p>Year: {details.year}</p>
        <p>Price: {details.price}</p>
      </Text>
    </Details>}
  </Item>
)

export default CatalogItem
