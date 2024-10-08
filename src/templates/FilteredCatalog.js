import * as React from "react"

import { graphql } from "gatsby"
import { productsFragment } from "../GraphQLFragments/productsFragment"
import Seo from "../components/seo"

import Layout from "../components/Layout/Layout"
import Catalog from "../components/Catalog"
const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const FilteredCatalog = ({ data }) => {
  return (
    <Layout>
      <Catalog products={data.filteredProducts.nodes} />
    </Layout>
  )
}
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = ({ pageContext }) => {
  console.log(pageContext)
  return <Seo title={`Catalogo de ${pageContext.category}`} showDefaultTitle />
}

export default FilteredCatalog

export const query = graphql`
  query ($category: String) {
    filteredProducts: allProduct(filter: { category: { eq: $category } }) {
      ...productsFragment
    }
  }
`
