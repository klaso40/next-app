import type { NextApiRequest, NextApiResponse } from 'next'
import products from '../../../database/products'
import Product from '../../../types/Product'
import ResponseError from '../../../types/ResponseError'
import productValidationSchema from '../../../utils/schemas/productValidationSchema'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Product | ResponseError>
) {
    switch (req.method) {
        case 'GET':
            return getProductByID(req, res)
        case 'PUT':
            return updateProduct(req, res)
        default:
            res.status(405).json({
                code: 405,
                message: 'Method not allowed'
            })
    }
}

const getProductByID = async (req: NextApiRequest, res: NextApiResponse<Product | ResponseError>) => {
    const productID = Number(req.query.productID)
    const product = products.find((product) => product.id === productID)
    if(!product) {
        res.status(404).json({
            code: 404,
            message: 'Product not found'
        })
    } else {
        res.status(200).json(product)
    }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Product | ResponseError>) => {
    const { body } = req
    const productID = Number(req.query.productID)
    try {
        await productValidationSchema.validate(body)
    } catch (err: any) {
        return res.status(400).json({
            code: 400,
            message: 'Data are invalid',
            errors: err.errors
        })
    }

    const productToUpdate = products.find((product) => product.id === productID)
    if(!productToUpdate) {
        return res.status(404).json({
            code: 404,
            message: 'Product not found'
        })
    }

    const updatedProduct: Product = {
        id: productToUpdate.id,
        name: body.productName,
        description: body.description,
        price: body.price,
        imageURL: body.imageURL
    }

    products.forEach((product: Product, idx) => product.id === productToUpdate.id ? products[idx] = updatedProduct : products[idx] = product)
    return res.status(200).json(updatedProduct)
}
