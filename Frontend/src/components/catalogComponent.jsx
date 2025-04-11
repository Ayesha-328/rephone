// import React, { useEffect, useState } from 'react';

// const ProductCatalog = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/products')
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []); // Fetch only once when component loads

//   return (
//     <div>
//       <h2>Product Catalog</h2>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             <img src={product.imageUrl} alt={product.name} />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCatalog;
import React, { useEffect, useState } from 'react';

const ProductCatalog = () => {
  // Default products
  const initialProducts = [
    {
        _id: '1',
        name: 'iPhone 13 Pro',
        description: '128GB, Graphite, Excellent Condition',
        price: 899,
        imageUrl: '/catalogAssests/infinix.jpeg',
    },
    {
      _id: '2',
      name: 'Samsung Galaxy S21',
      description: '256GB, Phantom Black, Slightly Used',
      price: 749,
      imageUrl: '/catalogAssests/Oppo.jpeg',
    },
    {
      _id: '3',
      name: 'Google Pixel 6',
      description: '128GB, Stormy Black, Brand New',
      price: 599,
      imageUrl: '/catalogAssests/Tecno.jpeg',
    },
    {
      _id: '4',
      name: 'OnePlus 9',
      description: '256GB, Winter Mist, Open Box',
      price: 679,
      imageUrl: '/catalogAssests/Vivo.jpeg',
    },
    {
      _id: '5',
      name: 'Xiaomi Mi 11',
      description: '256GB, Midnight Gray, Like New',
      price: 499,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    // Future backend fetch logic can be re-enabled if needed
    // fetch('http://localhost:5000/products')
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data))
    //   .catch((error) => console.error('Error fetching products:', error));
  }, []); // Runs once when component mounts

  return (
    <div className='relative top-180'>
      <h2 className="text-2xl font-bold text-center my-4">Product Catalog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-3xl shadow-md text-center w-50">
            <img src={product.imageUrl} alt={product.name} className="w-20 h-32 mx-auto" />
            <h3 className="text-md font-semibold mt-2">{product.name}</h3>
            <p className="text-md text-gray-600">{product.description}</p>
            <p className="text-md font-bold text-orange-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog