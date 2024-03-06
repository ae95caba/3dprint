import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { nameToPath } from "../functions/nameToPath"
import Seo from "../components/seo"
import "../index.scss"

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = ({ data }) => {
  const products = data.products.nodes

  return (
    <main>
      <section className="home">
        <div className="content">
          <h1>Catalogo</h1>
          <div className="cards-container">
            {products.map(product => (
              <Card product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
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
        images {
          data {
            publicURL
            childImageSharp240: childImageSharp {
              gatsbyImageData(width: 240)
            }
          }
        }
      }
    }
  }
`

function Card({ product }) {
  const [image, setImage] = useState()

  useEffect(() => {
    if (product.images[0].data.childImageSharp240) {
      setImage(
        <GatsbyImage
          image={getImage(product.images[0].data.childImageSharp240)}
        />
      )
    } else {
      setImage(
        <img
          loading="lazy"
          src={product.images[0].data.publicURL}
          alt=""
          role="presentation"
          fetchPriority="low"
          decoding="async"
        />
      )
    }
  }, [product])

  return (
    <Link to={nameToPath(product.name)}>
      <div className="card">
        {image}
        <div className="title-container">
          <h2>{product.name}</h2>
        </div>
      </div>
    </Link>
  )
}
