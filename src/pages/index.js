import * as React from "react"
import { useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { nameToPath } from "../functions/nameToPath"
import Seo from "../components/seo"
import "../index.scss"
import Layout from "../components/Layout/Layout"
import { GlobalContext } from "../context/GlobalContext"
const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = () => {
  /*  const products = data.products.nodes */
  const { displayedProducts } = useContext(GlobalContext)
  return (
    <Layout>
      <main>
        <section className="home">
          <div className="content">
            <h1>Catalogo</h1>
            <div className="cards-container">
              {displayedProducts.map(product => (
                <Card product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

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
        <video
          autoPlay
          loop
          muted
          playsInline
          fetchPriority="low"
          decoding="async"
        >
          <source src={product.images[0].data.publicURL} type="video/webm" />
        </video>
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
