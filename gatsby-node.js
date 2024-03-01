const crypto = require("crypto")

exports.sourceNodes = async ({ actions }) => {
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

    // Map into these results and create nodes
    products.records.forEach(product => {
      // Create your node object
      const productNode = {
        // Required fields
        id: `${product.id}`,
        parent: `__SOURCE__`,
        internal: {
          type: `Product`, // name of the graphQL query
          // contentDigest will be added just after
          // but it is required
        },
        children: [],

        // Other fields that you want to query with GraphQL
        createdTime: product.createdTime,
        ...product.fields,
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
