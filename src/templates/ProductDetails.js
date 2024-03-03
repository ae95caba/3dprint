import React from "react"
import { graphql } from "gatsby"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { useRef } from "react"
export default function ProductDetails({ data }) {
  const name = data.product.name
  const images = data.images.nodes
  console.log(images)
  const imageGalleryRef = useRef(null)
  const onClickHandler = () => {
    imageGalleryRef.current.fullScreen()
  }

  return (
    <div>
      <h1>{name}</h1>
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
