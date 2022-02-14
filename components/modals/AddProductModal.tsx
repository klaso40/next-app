import BaseButton, {ButtonNativeType, ButtonType} from '../buttons/BaseButton'
import BaseModal from './BaseModal'
import {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import productValidationSchema from '../../utils/schemas/productValidationSchema'
import ResponseError from '../../types/ResponseError'
import ApiClient from '../../utils/apiClient'
import ProductForm from '../forms/ProductForm'
import ApiErrorsList from '../ApiErrorsList'

const AddProductModal = ({ onProductCreate }: { onProductCreate: () => void }) => {
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
                await ApiClient.post('/products', values)
                setApiErrors(null)
                onProductCreate()
                resetForm()
                setIsOpen(false)
            } catch (e) {
                setApiErrors(e as ResponseError)
            }
        },
        validationSchema: productValidationSchema,
        initialValues: {
            productName: '',
            imageURL: '',
            price: null,
            description: ''
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
                filled={true}>
                Add new product
            </BaseButton>
            <BaseModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Add new product"
                onSubmit={handleSubmit}
                submitButton={
                    <BaseButton
                        type={ButtonNativeType.Submit}
                        filled={true}
                        isLoading={isSubmitting}
                    >
                        Add new product
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

export default AddProductModal
