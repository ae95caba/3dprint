import React from "react"
import { useRef, useEffect } from "react"
import "./header2.css"
export default function Navigation() {
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
    <nav className="navigation" ref={headerRef}>
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
        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              News
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Sport
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Weather
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              TV
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Radio
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Travel
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Music
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Food
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Arts
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Earth
            </a>
          </li>
          <li className="navigation__item">
            <a href="#" className="navigation__link">
              Local
            </a>
          </li>
        </ul>
        <div className="navigation__toggle">
          <label htmlFor="more" aria-hidden="true" className="navigation__link">
            More
          </label>
        </div>
      </div>
    </nav>
  )
}
