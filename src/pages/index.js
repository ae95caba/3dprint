import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { nameToPath } from "../functions/nameToPath"
import Seo from "../components/seo"
import "../index.scss"

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = ({ data }) => {
  console.log(JSON.stringify(data))
  const products = data.products.nodes
  console.log(products)

  return (
    <div>
      <h1>hello world</h1>
      <div className="cards-container">
        {products.map(product => (
          <Card product={product} />
        ))}
      </div>
    </div>
  )
}
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
export const query = graphql`
  query {
    products: allProduct {
      nodes {
        id
        name
        createdTime
        preview {
          thumbnails {
            large {
              url
            }
          }
        }
        images {
          url
        }
      }
    }
  }
`

function Card({ product }) {
  return (
    <Link to={nameToPath(product.name)}>
      <div className="card">
        <img src={product.preview[0].thumbnails.large.url} />
        <div className="title-container">
          <h2>{product.name}</h2>
        </div>
      </div>
    </Link>
  )
}
