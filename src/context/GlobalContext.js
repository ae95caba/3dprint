import React, { createContext, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
export const GlobalContext = createContext({
  products: [],
})

export default function GlobalContextProvider({ children }) {
  const data = useStaticQuery(graphql`
    query {
      products: allProduct {
        nodes {
          category
          id
          name
          createdTime
          images {
            data {
              publicURL
              childImageSharp240: childImageSharp {
                gatsbyImageData(width: 400)
              }
            }
          }
        }
      }
    }
  `)

  const allProducts = data.products.nodes

  const [displayedProducts, setDisplayedProducts] = useState(allProducts)

  return (
    <GlobalContext.Provider
      value={{ displayedProducts, setDisplayedProducts, allProducts }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
