import React from "react"
import { graphql } from "gatsby"
import { useRef, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import OutsideClickHandler from "react-outside-click-handler"
import { isMobile } from "react-device-detect"
import Layout from "../components/Layout/Layout"
import Seo from "../components/seo"
export default function ProductDetails({ data }) {
  const name = data.product.name
  let images = []
  for (let i = 1; i <= 5; i++) {
    if (data.product[`image${i}`]) {
      images.push(data.product[`image${i}`])
    }
  }
  console.log(`images arr is ${JSON.stringify(images)}`)
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState()

  return (
    <Layout>
      <main>
        <section className="details">
          <div className="content">
            <h1>{name}</h1>
            <Carousel
              onClickItem={(index, item) => {
                if (!isMobile) {
                  setShowModal(true)
                  setModalImage(item)
                }
              }}
              thumbWidth={100}
              swipeable={false}
              renderThumbs={() =>
                images.map(image => {
                  if (image.childImageSharp90) {
                    const img = getImage(
                      image.childImageSharp90.gatsbyImageData
                    )
                    return <GatsbyImage image={img} />
                  } else
                    return (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        fetchPriority="low"
                        decoding="async"
                      >
                        <source src={image.publicURL} type="video/webm" />
                      </video>
                    )
                })
              }
            >
              {images.map(image => {
                if (image.childImageSharp) {
                  const img = getImage(image.childImageSharp.gatsbyImageData)
                  return <GatsbyImage image={img} />
                } else
                  return (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      fetchPriority="low"
                      decoding="async"
                    >
                      <source src={image.publicURL} type="video/webm" />
                    </video>
                  )
              })}
            </Carousel>
          </div>
          {!isMobile && showModal && (
            <div className="modal">
              <OutsideClickHandler
                display="contents"
                onOutsideClick={() => {
                  setShowModal(false)
                }}
              >
                {modalImage}
              </OutsideClickHandler>
            </div>
          )}
        </section>
      </main>
    </Layout>
  )
}

export const Head = ({ data }) => {
  return (
    <Seo title={data.product.name} previewUrl={data.product.image1.publicURL} />
  )
}

export const query = graphql`
  query ($id: String) {
    product(id: { eq: $id }) {
      name

      image1 {
        childImageSharp {
          gatsbyImageData
        }
        childImageSharp90: childImageSharp {
          gatsbyImageData(width: 100)
        }
        publicURL
      }
      image1 {
        childImageSharp {
          gatsbyImageData
        }
        childImageSharp90: childImageSharp {
          gatsbyImageData(width: 100)
        }
        publicURL
      }
      image2 {
        childImageSharp {
          gatsbyImageData
        }
        childImageSharp90: childImageSharp {
          gatsbyImageData(width: 100)
        }
        publicURL
      }
      image3 {
        childImageSharp {
          gatsbyImageData
        }
        childImageSharp90: childImageSharp {
          gatsbyImageData(width: 100)
        }
        publicURL
      }
      image4 {
        childImageSharp {
          gatsbyImageData
        }
        childImageSharp90: childImageSharp {
          gatsbyImageData(width: 100)
        }
        publicURL
      }
      image5 {
        childImageSharp {
          gatsbyImageData
        }
        childImageSharp90: childImageSharp {
          gatsbyImageData(width: 100)
        }
        publicURL
      }
    }
  }
`
