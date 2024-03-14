/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, title, children, showDefaultTitle, previewUrl }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
              portfolio
            }
          }
        }
      }
    `
  )

  function isVideoUrl(url) {
    // Extract the file extension from the URL
    const fileExtension = url.split(".").pop().toLowerCase()

    // Define an array of video file extensions
    const videoExtensions = [
      "mp4",
      "webm",
      "ogg",
      "avi",
      "mov",
      "wmv",
      "flv",
      "mkv",
      "m4v",
      "3gp",
    ]

    // Check if the file extension is included in the videoExtensions array
    return videoExtensions.includes(fileExtension)
  }

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = showDefaultTitle && site.siteMetadata?.title

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      {previewUrl && <meta property={`og:image`} content={previewUrl} />}
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.author.name || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
