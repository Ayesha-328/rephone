import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../client/buyers/component/CartContext'; // adjust path as needed
import { Header } from './Header';
// import { div } from 'three/tsl'; // <- This seems unused, can likely remove

const ProductDescription = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart(); // ✅ Hook is correctly at the top

    useEffect(() => {
        fetch(`http://localhost:5000/api/product/${id}`)
            .then((res) => {
                if (!res.ok) {
                     throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched Product Data:", data); // <-- Add log to see data structure
                setProduct(data);
            })
            .catch((err) => console.error("Error loading product:", err));
    }, [id]); // Dependency array is correct

    if (!product) {
        return (
             <div className="flex justify-center items-center min-h-screen">
                 <div className="text-center text-xl">Loading...</div>
             </div>
         );
    }

    // Helper function to get the image source (URL or placeholder)
    const getImageSource = () => {
        // Check if phoneImage is an array and has at least one string element that starts with http or data:
        if (Array.isArray(product.phoneImage) &&
            product.phoneImage.length > 0 &&
            typeof product.phoneImage[0] === 'string' &&
            (product.phoneImage[0].startsWith('http') || product.phoneImage[0].startsWith('data:'))
           )
        {
            return product.phoneImage[0]; // Return the URL or data URI string
        }
        // Return a placeholder or empty string if data is invalid
        return '/path/to/your/placeholder-image.jpg'; // <--- Replace with an actual placeholder path
        // Or you could just return '' if you don't want a placeholder
    };


    const handleAddToCart = () => {
        const item = {
            productid: product.productid,
            phone_model: product.phone_model,
            price: product.price,
            // --- CHANGE HERE ---
            // Use the same logic as for the image display src
            image: getImageSource() // Use the resolved image source (URL or placeholder URL)
            // --- END CHANGE ---
        };
        addToCart(item);
        alert(`${product.phone_model} added to cart!`); // Optional feedback
    };


    return (
       <div>
        <Header/>
         <div className='flex w-screen min-h-screen p-6 text-white'>
            <div className='mt-35 ml-40'>
                <p className='font-[Merriweather] text-bold text-2xl'>
                    <strong className='text-[#FF9F1C]'>Brand:</strong>
                    <span className='font-[Montserrat] text-2xl font-medium ml-5'>{product.phone_brand}</span>
                </p>
                {/* <img
                    src={getImageSource()}
                    alt={product.phone_model}
                    className="w-70 h-auto lg:w-70 lg:h-90 mb-4 border border-white rounded-xl mt-5 object-contain"
                /> */}
                <img
  src={getImageSource()}
  alt={product.phone_model}
  className="w-[300px] h-[400px] mb-4 border border-white rounded-xl mt-5 object-cover"
/>

            </div>
            <div className="bg-[#FFFFFF] w-120 h-120 fixed right-35 top-40 font-[Merriweather] text-[rgba(0,0,0,0.7)] font-medium text-md space-y-2 p-5">
                <p><strong>Model: </strong>{product.phone_model}</p>
                <p><strong>OS: </strong>{product.os}</p>
                <p><strong>RAM: </strong>{product.ram} GB</p>
                <p><strong>Storage: </strong>{product.storage} GB</p>
                <p><strong>Price: </strong>${product.price}</p>
                <p><strong>Seller: </strong>{product.sellerName} ({product.sellerEmail})</p>
                <p><strong>Launch Date: </strong>{product.launch_date}</p>
                <p><strong>Display Resolution: </strong>{product.display_resolution}</p>
                <p><strong>Video: </strong>{product.video}</p>
                <button
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] hover:bg-gradient-to-br text-[#FFFFFF] text-3xl font-bold font-[Merriweather] text-center w-70 h-12 lg:w-110 lg:h-12 ml-1 mt-5"
                >
                    Add to Cart
                </button>
            </div>
        </div>
       </div>
    );
};

export default ProductDescription;
