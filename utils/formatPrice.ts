const formatPrice = (price: number): string =>
    Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(price)

export default formatPrice
