import React from "react"

import { useContext, useRef, useEffect, useLayoutEffect } from "react"
import logo from "./logo.svg"

import animationData from "./hamburger-menu.json"
import Lottie from "lottie-react"
import Tabs from "./Tabs"

export default function Header() {
  const hambugerAnimationRef = useRef(null)
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
    <header ref={headerRef}>
      <div className="content">
        <img className="logo" src={logo} alt="" />

        <div className="container">
          <nav>
            <Tabs />
          </nav>
          <input
            type="checkbox"
            id="checkbox"
            onChange={e => {
              const isChecked = e.target.checked

              if (isChecked) {
                hambugerAnimationRef.current?.playSegments([0, 50], true)
              } else {
                hambugerAnimationRef.current?.playSegments([75, 150], false)
              }
            }}
          />
          <label for="checkbox" class="overlay"></label>
          <Sidebar />
          <label className="hamburger-menu" htmlFor="checkbox">
            <Lottie
              lottieRef={hambugerAnimationRef}
              animationData={animationData}
              autoplay={false}
              loop={0}
            />
          </label>
        </div>
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <Tabs />
    </aside>
  )
}
