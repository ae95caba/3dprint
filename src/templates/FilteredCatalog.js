import * as React from "react"

import { graphql } from "gatsby"

import Seo from "../components/seo"

import Layout from "../components/Layout/Layout"
import Catalog from "../components/Catalog"
const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const FilteredCatalog = ({ data }) => {
  const products = data.filteredProducts.nodes

  return (
    <Layout>
      <Catalog products={products} />
    </Layout>
  )
}
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home2" />

export default FilteredCatalog

export const query = graphql`
  query ($category: String) {
    filteredProducts: allProduct(filter: { category: { eq: $category } }) {
      nodes {
        id
        name
        createdTime
        images {
          data {
            publicURL
            childImageSharp240: childImageSharp {
              gatsbyImageData(width: 400)
            }
          }
        }
      }
    }
  }
`
