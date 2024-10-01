import { useEffect, useState, useRef } from 'react';
import Card from './Card';
import ProductModal from './ProductModal';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);



    useEffect(() => {
        const fetchProducts = async (page) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://fakestoreapi.com/products?limit=10&page=${page}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts((prevProducts) => [...prevProducts, ...data]);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Product List
            </h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <div key={product.id} onClick={() => handleCardClick(product)}>
                        <Card
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                        />
                    </div>
                ))}
            </div>
            {loading && (
                <div className="flex items-center justify-center h-full">
                    <svg
                        className="animate-spin h-8 w-8 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                    <span className="ml-3 text-gray-600 text-lg">Loading...</span>
                </div>
            )}
            <ProductModal
                open={Boolean(selectedProduct)}
                handleClose={handleCloseModal}
                product={selectedProduct}
            />
        </div>
    );
};

export default Products;
