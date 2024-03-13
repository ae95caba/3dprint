import React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { nameToPath } from "../functions/nameToPath"

export default function Catalog({ products }) {
  return (
    <main>
      <section className="home">
        <div className="content">
          <h1>Catalogo</h1>
          <div className="cards-container">
            {products.map(product => (
              <Card product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function Card({ product }) {
  const [image, setImage] = useState()

  useEffect(() => {
    if (product.images[0].data.childImageSharp240) {
      setImage(
        <GatsbyImage
          image={getImage(product.images[0].data.childImageSharp240)}
        />
      )
    } else {
      setImage(
        <video
          autoPlay
          loop
          muted
          playsInline
          fetchPriority="low"
          decoding="async"
        >
          <source src={product.images[0].data.publicURL} type="video/webm" />
        </video>
      )
    }
  }, [product])

  return (
    <Link to={`/${nameToPath(product.name)}`}>
      <div className="card">
        {image}
        <div className="title-container">
          <h2>{product.name}</h2>
        </div>
      </div>
    </Link>
  )
}
