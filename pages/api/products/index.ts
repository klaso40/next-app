// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import products from '../../../database/products'
import Product from '../../../types/Product'
import ResponseError from '../../../types/ResponseError'
import productValidationSchema from '../../../utils/schemas/productValidationSchema'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Product> | Product | ResponseError>
) {
    switch (req.method) {
        case 'GET':
            return getAllProducts(req, res)
        case 'POST':
            return createNewProduct(req, res)
        default:
            res.status(405).json({
                code: 405,
                message: 'Method not allowed'
            })
    }

}

const getAllProducts = (req: NextApiRequest, res: NextApiResponse<Array<Product>>) => {
    res.status(200).json(products)
}

const createNewProduct = async (req: NextApiRequest, res: NextApiResponse<Product | ResponseError>) => {
    const { body } = req
    try {
        await productValidationSchema.validate(body)
    } catch (err: any) {
        return res.status(400).json({
            code: 400,
            message: 'Data are invalid',
            errors: err.errors
        })
    }

    const newProduct: Product = {
        id: Date.now(),
        name: body.productName,
        description: body.description,
        imageURL: body.imageURL,
        price: body.price,
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
}
