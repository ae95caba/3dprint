import React from "react"

import { graphql, useStaticQuery } from "gatsby"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          copyright
          author {
            name
            portfolio
          }
        }
      }
    }
  `)
  const { copyright, author } = data.site.siteMetadata

  return (
    <footer>
      <div className="content">
        <p className="copyright">
          {copyright} por
          <a href={author.portfolio}> {author.name}</a>
        </p>
      </div>
    </footer>
  )
}
