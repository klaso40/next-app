import BaseButton, {ButtonNativeType, ButtonType} from '../buttons/BaseButton'
import BaseModal from './BaseModal'
import {useEffect, useState} from 'react'
import ResponseError from '../../types/ResponseError'
import {useFormik} from 'formik'
import ApiClient from '../../utils/apiClient'
import productValidationSchema from '../../utils/schemas/productValidationSchema'
import Product from '../../types/Product'
import ProductForm from '../forms/ProductForm'
import {PencilIcon} from '@heroicons/react/outline'
import ApiErrorsList from '../ApiErrorsList'

const EditProductModal = ({ product, onProductUpdate }: { product: Product, onProductUpdate: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [apiErrors, setApiErrors] = useState<ResponseError | null>(null)

    const {
        handleSubmit,
        errors,
        touched,
        handleChange,
        resetForm,
        values,
        isSubmitting
    } = useFormik({
        onSubmit: async ( values) => {
            try {
                await ApiClient.put(`/products/${product.id}`, values)
                setApiErrors(null)
                onProductUpdate()
                resetForm()
                setIsOpen(false)
            } catch (e) {
                setApiErrors(e as ResponseError)
            }
        },
        validationSchema: productValidationSchema,
        initialValues: {
            productName: product.name,
            imageURL: product.imageURL,
            price: product.price,
            description: product.description
        }
    })

    useEffect(() => {
        if(!isOpen) {
            resetForm()
        }
    }, [isOpen])

    return (
        <>
            <BaseButton
                onClick={() => setIsOpen(true)}
                filled={false}
                icon={<PencilIcon />}
                className="!w-full">
                Edit product
            </BaseButton>
            <BaseModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Edit product"
                onSubmit={handleSubmit}
                submitButton={
                    <BaseButton
                        type={ButtonNativeType.Submit}
                        filled={true}
                        isLoading={isSubmitting}
                    >
                        Save changes
                    </BaseButton>
                }
                cancelButton={
                    <BaseButton
                        onClick={() => setIsOpen(false)}
                        buttonType={ButtonType.Danger}>
                        Cancel
                    </BaseButton>
                }
            >
                <>
                    <ApiErrorsList apiErrors={apiErrors} />
                    <ProductForm
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        values={values}
                    />
                </>
            </BaseModal>

        </>
    )
}

export default EditProductModal
