import React from "react"
import { graphql } from "gatsby"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useRef } from "react"
export default function ProductDetails({ data }) {
  const name = data.product.name
  const images = data.images.nodes
  console.log(images)

  return (
    <div>
      <h1>{name}</h1>
      {images.map(image => {
        const img = getImage(image?.childImageSharp?.GatsbyImage)
        return <GatsbyImage image={img} />
      })}
      <Carousel>
        {images.map(image => {
          return <img src={image.publicURL} />
        })}
      </Carousel>
    </div>
  )
}

export const query = graphql`
  query ($id: String) {
    product(id: { eq: $id }) {
      name
    }

    images: allFile(filter: { parent: { id: { eq: $id } } }) {
      nodes {
        publicURL
        childImageSharp {
          gatsbyImageData
        }
      }
    }

    thumbnails: allFile(filter: { parent: { id: { eq: $id } } }) {
      nodes {
        publicURL
        childImageSharp {
          gatsbyImageData(
            width: 250
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }
`
