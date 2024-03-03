import React from "react"
import { graphql } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css"
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

      {images.map(image => {
        const img = getImage(image.childImageSharp.gatsbyImageData)

        return <GatsbyImage image={img} />

        /*  return <img src={image.publicURL} alt="" /> */
      })}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}
      >
        {images.map(image => {
          const img = getImage(image.childImageSharp.gatsbyImageData)

          return (
            <SwiperSlide>
              <GatsbyImage image={img} />
            </SwiperSlide>
          )

          /*  return <img src={image.publicURL} alt="" /> */
        })}
      </Swiper>
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
