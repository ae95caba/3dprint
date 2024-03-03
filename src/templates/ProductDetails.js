import React from "react"
import { graphql } from "gatsby"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useRef } from "react"
export default function ProductDetails({ data }) {
  const name = data.product.name
  const images = data.images.nodes
  const thumbs = data.thumbs.nodes
  console.log(images)

  return (
    <div>
      <h1>{name}</h1>

      <Carousel
        renderThumbs={() =>
          thumbs.map(thumb => {
            if (thumb.childImageSharp) {
              const img = getImage(thumb.childImageSharp.gatsbyImageData)
              return <GatsbyImage image={img} />
            } else return <img src={thumb.publicURL} />
          })
        }
      >
        {images.map(image => {
          if (image.childImageSharp) {
            const img = getImage(image.childImageSharp.gatsbyImageData)
            return <GatsbyImage image={img} />
          } else return <img src={image.publicURL} />
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

    thumbs: allFile(filter: { parent: { id: { eq: $id } } }) {
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
