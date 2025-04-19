const ProductCard = ({ product, onViewDetails, onVerify, onReject }) => {
    return (
      <div className="product-card">
        <img 
          src={`data:image/jpeg;base64,${product.phoneImage[0]}`} 
          alt={`${product.phone_brand} ${product.phone_model}`} 
          className="product-image"
        />
        <div className="product-info">
          <h3>{product.sellerName}</h3>
          <p>Registered: {product.sellerType}</p>
          <p>Brand: {product.phone_brand}</p>
          <p>Model: {product.phone_model}</p>
        </div>
        <div className="product-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => onViewDetails(product.imeiNumber)}
          >
            View Request Details
          </button>
          <button 
            className="btn btn-success" 
            onClick={() => onVerify(product.imeiNumber)}
          >
            Verify
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onReject(product.imeiNumber)}
          >
            Reject
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;