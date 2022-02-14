import BaseInput from '../inputs/BaseInput'
import BaseTextarea from '../inputs/BaseTextarea'
import {FormikErrors, FormikTouched} from 'formik'
import {ChangeEvent} from 'react'

type ErrorsType = FormikErrors<{
    productName: string,
    imageURL: string,
    price: null,
    description: string
}>

type TouchedType = FormikTouched<{
    productName: string,
    imageURL: string,
    price: null,
    description: string
}>

type FormValues = {
    productName: string,
    imageURL: string,
    price: null | number,
    description: string
}

const ProductForm = ({ errors, touched, handleChange, values }: { errors: ErrorsType, touched: TouchedType, handleChange: (e: ChangeEvent) => void, values: FormValues}) => {

    return (
        <div className="flex flex-col gap-2">
            <BaseInput
                label="Product name"
                name="productName"
                onChange={handleChange}
                touched={touched.productName}
                errors={errors.productName}
                value={values.productName}
            />
            <BaseInput
                label="Image url"
                name="imageURL"
                onChange={handleChange}
                touched={touched.imageURL}
                errors={errors.imageURL}
                value={values.imageURL}
            />

            <BaseInput
                label="Price ($)"
                type="number"
                name="price"
                onChange={handleChange}
                touched={touched.price}
                errors={errors.price}
                value={values.price}
            />

            <BaseTextarea
                label="Description"
                name="description"
                onChange={handleChange}
                touched={touched.description}
                errors={errors.description}
                value={values.description}
            />
        </div>
    )
}

export default ProductForm
