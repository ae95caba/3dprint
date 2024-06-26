const crypto = require("crypto")
const path = require(`path`)
const { nameToPath } = require(`./src/functions/nameToPath.js`)
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Product implements Node {
      images: [Images]
    }
    type Images {
     data: File @link(by:"url", from: "url")
    }
 
  
  `)
}

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions

  const fetchProducts = async () => {
    console.log(`api url is ${process.env.GATSBY_API_URL}`)
    const apiUrl = process.env.GATSBY_API_URL
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer pathJ3nlOYgcpiEp1.2fe040c70f744f2b0bd488de99c6e45df6c77d7580fb46c6011981dcaec08cb8",
      },
    }
    const response = await fetch(apiUrl, requestOptions)

    if (!response.ok) {
      throw new Error("Request failed")
    }

    const data = await response.json()

    return data
  }

  try {
    // Await for results
    const products = await fetchProducts()

    function handleImages(product) {
      const imagesArray = []

      for (let i = 1; i <= 5; i++) {
        const fieldName = `image${i}`
        if (product.hasOwnProperty(fieldName)) {
          imagesArray.push({ url: product[fieldName], id: `image-${i}` })
        }
      }
      console.log(`imagesArray is ${JSON.stringify(imagesArray)}`)
      return imagesArray
    }

    // Map into these results and create nodes
    products.forEach(product => {
      // Create your node object

      const productNode = {
        // Required fields
        id: `${product._id}`,

        parent: `__SOURCE__`,
        internal: {
          type: `Product`, // name of the graphQL query
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        // Other fields that you want to query with GraphQL
        createdTime: product.createdTime,
        name: product.name,

        category: product.category,
        images: handleImages(product),
        // etc...
      }

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(productNode))
        .digest(`hex`)
      // Add it to userNode
      productNode.internal.contentDigest = contentDigest

      // Create node with the Gatsby createNode() API
      createNode(productNode)
    })
  } catch (error) {
    console.error("Error fetching data from the API:", error)
  }

  return
}

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      categories: allProduct {
        distinct(field: { category: SELECT })
      }
      pageData: allProduct {
        nodes {
          name
          id
        }
      }
    }
  `)

  data.categories.distinct.forEach(node =>
    actions.createPage({
      path: `/${nameToPath(node)}`,
      component: path.resolve(`./src/templates/FilteredCatalog.js`),
      context: { category: node },
    })
  )

  //////////////////////////////////////////

  data.pageData.nodes.forEach(node =>
    actions.createPage({
      path: `/${nameToPath(node.name)}`,
      component: path.resolve(`./src/templates/ProductDetails.js`),
      context: { id: node.id },
    })
  )
  ///////////
}

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  let gatsbyImageDataNode
  if (node.internal.type === "Product") {
    const { createNode } = actions

    for (const image of node.images) {
      const { createNodeField, createNode } = actions

      /* Download the image and create the File node. Using gatsby-plugin-sharp and gatsby-transformer-sharp the node will become an ImageSharp. */
      gatsbyImageDataNode = await createRemoteFileNode({
        url: image.url,
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        /*    store, // Gatsby's redux store */
        getCache, // get Gatsby's cache
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id

        store,
      })
      console.log(`gastby image data for ${node.name} created !`)
      ////////////////////////////////////////////////////////////////////////
    }
  }
}
