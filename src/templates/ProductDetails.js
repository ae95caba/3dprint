import React from "react"
import { graphql } from "gatsby"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useRef } from "react"
export default function ProductDetails({ data }) {
  const name = data.product.name
  const images = data.product.images

  console.log(images)

  return (
    <main>
      <section className="catalog">
        <div className="content">
          <h1>{name}</h1>
          <Carousel
            renderThumbs={() =>
              images.map(image => {
                if (image.data.childImageSharp90) {
                  const img = getImage(
                    image.data.childImageSharp90.gatsbyImageData
                  )
                  return <GatsbyImage image={img} />
                } else return <img src={image.data.publicURL} />
              })
            }
          >
            {images.map(image => {
              if (image.data.childImageSharp) {
                const img = getImage(image.data.childImageSharp.gatsbyImageData)
                return <GatsbyImage image={img} />
              } else return <img src={image.data.publicURL} />
            })}
          </Carousel>
        </div>
      </section>
    </main>
  )
}

export const query = graphql`
  query ($id: String) {
    product(id: { eq: $id }) {
      name
      images {
        data {
          childImageSharp {
            gatsbyImageData(width: 480)
          }
          childImageSharp90: childImageSharp {
            gatsbyImageData(width: 100)
          }
          publicURL
        }
      }
    }
  }
`
