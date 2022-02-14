import * as Yup from 'yup'

const productValidationSchema = Yup.object().shape({
    productName: Yup.string()
        .required(),
    imageURL: Yup.string()
        .url()
        .required(),
    price: Yup.number()
        .nullable()
        .min(0.01)
        .required(),
    description: Yup.string()
        .required()
})

export default productValidationSchema
