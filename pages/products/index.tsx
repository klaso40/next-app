import type { NextPage } from 'next'
import AddProductModal from '../../components/modals/AddProductModal'
import useSWR from 'swr'
import Product from '../../types/Product'
import ApiClient from '../../utils/apiClient'
import Error from 'next/error'
import formatPrice from '../../utils/formatPrice'
import Link from 'next/link'

const fetcher = async (url: string): Promise<Array<Product>> => {
    const { data } = await ApiClient.get(url)
    return data as Array<Product>
}

const Home: NextPage = () => {

    const { data: products, error, mutate } = useSWR(`products`, fetcher)

    if(error) {
        return (
            <Error statusCode={error.response.status} />
        )
    }

    if(!products) {
        return (
            <span>Loading...</span>
        )
    }

    return (

        <>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Trending products</h2>
                <AddProductModal onProductCreate={mutate} />
            </div>
            <ProductsList products={products} />
        </>
    )
}

const ProductsList = ({ products }: { products: Array<Product> }) => (
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products.map((product) => (
            <div key={product.id} className="group relative">
                <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                        src={product.imageURL}
                        className="w-full h-full object-center object-cover"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                    <Link href={`/products/${product.id}`}>
                        <a>
                            <span className="absolute inset-0" />
                            {product.name}
                        </a>
                    </Link>

                </h3>
                <p className="mt-1 max-h-10 text-sm text-gray-500 text-ellipsis overflow-hidden">{product.description}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{formatPrice(product.price)}</p>
            </div>
        ))}
    </div>
)

export default Home
