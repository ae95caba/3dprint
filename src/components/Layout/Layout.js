/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import Header from "./Header.js"
import "./layout.scss"

import Footer from "./Footer.js"

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      {children}
      <Footer />
    </>
  )
}

export default Layout
