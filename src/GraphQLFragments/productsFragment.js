// src/queries/fragments.js
import { graphql } from "gatsby"

export const productsFragment = graphql`
  fragment productsFragment on ProductConnection {
    nodes {
      id
      name
      createdTime

      image1 {
        publicURL
        childImageSharp240: childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
      image2 {
        publicURL
        childImageSharp240: childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
      image3 {
        publicURL
        childImageSharp240: childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
      image4 {
        publicURL
        childImageSharp240: childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
      image5 {
        publicURL
        childImageSharp240: childImageSharp {
          gatsbyImageData(width: 400)
        }
      }
    }
  }
`
