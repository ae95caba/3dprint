import React from "react"
import { useRef, useEffect, useState } from "react"

import { useStaticQuery, graphql, Link } from "gatsby"
import { nameToPath } from "../../functions/nameToPath"
import logo from "./logo.png"
export default function Navigation() {
  const data = useStaticQuery(graphql`
    query {
      categories: allProduct {
        distinct(field: { category: SELECT })
      }
    }
  `)
  const categories = data.categories.distinct
  const headerRef = useRef(null)

  //set --header-height" css variable value after the page loads
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
          <Link to="/" className="navigation__link">
            <img className="logo" src={logo} />
          </Link>
        </div>

        <nav>
          <ul className="navigation__list">
            {categories.map(category => (
              <li className="navigation__item">
                <Link
                  activeClassName="active"
                  to={`/${nameToPath(category)}`}
                  className="navigation__link"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navigation__toggle">
          <label htmlFor="more" aria-hidden="true" className="navigation__link">
            Mas
          </label>
        </div>
      </div>
    </header>
  )
}
