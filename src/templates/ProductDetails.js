import React from "react"
import { graphql } from "gatsby"
export default function ProductDetails({ data }) {
  const product = data.product
  return (
    <div>
      <h1> {product.name}</h1> <img src="" alt="" />
    </div>
  )
}

export const query = graphql`
  query ($name: String) {
    product(name: { eq: $name }) {
      images {
        url
      }
      name
    }
  }
`
