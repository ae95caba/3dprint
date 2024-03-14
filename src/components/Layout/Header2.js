import React from "react"
import { useRef, useEffect, useState } from "react"

import { useStaticQuery, graphql, Link } from "gatsby"
import { nameToPath } from "../../functions/nameToPath"
import logo from "./logo.png"
export default function Navigation() {
  const [listHeight, setListHeight] = useState()
  const [headerHeight, setHeaderHeight] = useState()

  const data = useStaticQuery(graphql`
    query {
      categories: allProduct {
        distinct(field: { category: SELECT })
      }
    }
  `)
  const categories = data.categories.distinct

  const headerRef = useRef(null)
  const listRef = useRef(null)

  //set --header-height css variable and state value after the page loads
  useEffect(() => {
    const headerElement = headerRef.current

    const updateHeight = () => {
      if (headerElement) {
        console.log("Header Height:", headerElement.offsetHeight)
        setHeaderHeight(headerElement.offsetHeight)
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
  //set list height state value after the page loads and after every window resize
  useEffect(() => {
    const putListOffSetHeightValueToState = () => {
      setListHeight(listRef.current.offsetHeight)
    }

    setTimeout(putListOffSetHeightValueToState, 0)

    window.addEventListener("resize", putListOffSetHeightValueToState)
    // remove the event listener before the component gets unmounted
    return () =>
      window.removeEventListener("resize", putListOffSetHeightValueToState)
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
          <ul className="navigation__list" ref={listRef}>
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

        {listHeight > headerHeight && (
          <div className="navigation__toggle">
            <label
              htmlFor="more"
              aria-hidden="true"
              className="navigation__link"
            >
              Mas
            </label>
          </div>
        )}
      </div>
    </header>
  )
}
