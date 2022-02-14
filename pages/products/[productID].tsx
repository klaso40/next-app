import {NextPage} from 'next'
import {
    CurrencyDollarIcon,
    GlobeIcon,
} from '@heroicons/react/outline'
import useSWR from 'swr'
import {useRouter} from 'next/router'
import Product from '../../types/Product'
import ApiClient from '../../utils/apiClient'
import Error from 'next/error'
import EditProductModal from '../../components/modals/EditProductModal'
import formatPrice from '../../utils/formatPrice'
import BaseButton, {ButtonType} from '../../components/buttons/BaseButton'

const policies = [
    { name: 'International delivery', icon: GlobeIcon, description: 'Get your order in 2 years' },
    { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

const fetcher = async (url: string): Promise<Product> => {
    const { data } = await ApiClient.get(url)
    return data
}

const ProductDetailPage: NextPage = () => {
    const router = useRouter()
    const { productID } = router.query
    const { data: product, error, mutate } = useSWR(`/products/${productID}`, fetcher)

    if(error) {
        return (
            <Error statusCode={error.response.status} />
        )
    }

    if(!product) {
        return (
            <span>Loading...</span>
        )
    }

    return (

        <>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:auto-rows-auto max-h-min">
                <div className="lg:col-start-8 lg:col-span-5">
                    <ProductHeader product={product} />
                </div>

                <ImageGallery product={product} />

                <div className="lg:col-span-5 mt-8">
                    <ProductDetails product={product} />

                    <Policies />

                    <BaseButton
                        buttonType={ButtonType.Primary}
                        filled={true}
                        className="!w-full mt-4 !py-3 !px-8"
                    >
                        Add to cart
                    </BaseButton>

                    <div className="mt-4">
                        <EditProductModal
                            key={JSON.stringify(product)}
                            product={product}
                            onProductUpdate={mutate}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const ProductHeader = ({ product }: { product: Product }) => (
    <div className="flex justify-between">
        <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
        <p className="text-xl font-medium text-gray-900">{formatPrice(product.price)}</p>
    </div>
)

const ImageGallery = ({ product }: { product: Product }) => (
    <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:max-h-[700px] lg:row-start-1 lg:row-span-3">
        <h2 className="sr-only">Images</h2>
        <img
            src={product.imageURL}
            className="h-full w-full object-cover rounded-md"
        />
    </div>
)

const ProductDetails = ({ product }: { product: Product }) => (
    <div>
        <h2 className="text-sm font-medium text-gray-900">Description</h2>
        <p
            className="mt-4 prose prose-sm text-gray-500"
        >
            {product.description}
        </p>
    </div>
)

const Policies = () => (
    <section aria-labelledby="policies-heading" className="mt-10">
        <h2 id="policies-heading" className="sr-only">
            Our Policies
        </h2>

        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {policies.map((policy) => (
                <div key={policy.name} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <dt>
                        <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                </div>
            ))}
        </dl>
    </section>
)

export default ProductDetailPage
