import React from "react"
import { useRef, useEffect, useContext } from "react"
import "./header2.css"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalContext } from "../../context/GlobalContext"

export default function Navigation() {
  const { setDisplayedProducts, allProducts } = useContext(GlobalContext)

  const data = useStaticQuery(graphql`
    query MyQuery {
      categories: allProduct {
        distinct(field: { category: SELECT })
      }
    }
  `)

  function filteredProducts(products, category) {
    console.log(products[0])
    // Use the filter method to create a new array with products of the given category
    const filteredProducts = products.filter(product => {
      console.log(product)
      console.log(category)

      return product.category === category
    })
    console.log(filteredProducts)
    return filteredProducts
  }

  const categories = data.categories.distinct
  console.log(categories)
  const headerRef = useRef(null)
  //set --header-height" css variable value
  useEffect(() => {
    const headerElement = headerRef.current

    const updateHeight = () => {
      if (headerElement) {
        console.log("Header Height:", headerElement.offsetHeight)
        const root = document.documentElement
        root.style.setProperty(
          "--header-height",
          `${headerElement.offsetHeight}px`
        )
      }
    }

    // Schedule the code to run after the layout step
    setTimeout(updateHeight, 0)
  }, [])
  return (
    <header className="navigation" ref={headerRef}>
      <input
        type="checkbox"
        id="more"
        aria-hidden="true"
        tabIndex="-1"
        className="toggle"
      />
      <div className="navigation__inner">
        <div className="navigation__logo">
          <a href="#" className="navigation__link">
            Local news
          </a>
        </div>

        <nav>
          <ul className="navigation__list">
            {categories.map(category => (
              <li className="navigation__item">
                <a
                  href="#"
                  onClick={() => {
                    setDisplayedProducts(
                      filteredProducts(allProducts, category)
                    )
                  }}
                  className="navigation__link"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navigation__toggle">
          <label htmlFor="more" aria-hidden="true" className="navigation__link">
            More
          </label>
        </div>
      </div>
    </header>
  )
}
/* query MyQuery {
    allProduct {
      distinct(field: {category: SELECT})
    }
  } */
