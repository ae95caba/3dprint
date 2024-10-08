import * as React from "react"

import { graphql } from "gatsby"
import { productsFragment } from "../GraphQLFragments/productsFragment"
import Seo from "../components/seo"
import "../index.scss"
import Layout from "../components/Layout/Layout"
import Catalog from "../components/Catalog"
const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = ({ data }) => {
  const products = data.products.nodes

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
export const Head = () => <Seo title="Catalogo" showDefaultTitle />

export default IndexPage
export const query = graphql`
  query {
    products: allProduct {
      ...productsFragment
    }
  }
`
