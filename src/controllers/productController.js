const productModel = require('../models/productModel')

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' })
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productModel.getProductById(id)
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.createProduct(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await productModel.updateProduct(id, req.body)
    if (updatedProduct) {
      res.status(200).json(updatedProduct)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    await productModel.deleteProduct(id)
    res.status(204).json()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
