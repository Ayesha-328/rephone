import { useCart } from "./CartContext"; // adjust the path
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";

const OrderPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();
    return (
        <>
           <div>
            <Header/>
            <img className="w-120 ml-50 mt-15" src="/Order.svg" alt="" />

<div className="fixed right-35 top-35 w-120 h-120 bg-white shadow-lg rounded-lg flex flex-col">
    {/* Fixed Header */}
    <div className="border-b border-[rgba(0,0,0,0.5)] p-4 bg-white z-10">
        <p className="font-[Montserrat] text-xl font-bold text-[#003566] lg:text-3xl">
            Your Order
        </p>
    </div>

    {/* Scrollable Cart Items */}
    <div className="flex-1 overflow-y-auto px-2">
        {cartItems.map((item, index) => (
            <div
                key={index}
                className="flex items-center justify-between px-3 py-3 border-b border-gray-200"
            >
                <div className="flex">
                    <div className="w-20 h-25 bg-[#000000] mr-4">
                        <img
                            className="w-20 h-25 border-2 border-[#003566]"
                            src={item.image}
                            alt=""
                        />
                    </div>
                    <div>
                        <p className="font-[Merriweather] text-[rgba(0,0,0,0.7)] font-bold text-lg">
                            {item.phone_model}
                        </p>
                        <p className="font-[Merriweather] text-[#00BA00] font-semibold text-sm">
                            in stock
                        </p>
                        <p className="font-[Merriweather] text-[rgba(0,0,0,0.7)] font-thin text-md">
                            Price: ${item.price}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => removeFromCart(item.productid)}
                    className="p-1 hover:scale-110 transition-transform"
                    title="Remove from cart"
                >
                    <img src="/close.png" alt="Remove" className="w-5 h-5" />
                </button>
            </div>
        ))}
    </div>

    {/* Fixed Footer */}
    <div className="border-t border-[rgba(0,0,0,0.1)] p-4 bg-white z-10">
        <button onClick={() => navigate("/checkout")} className="bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] hover:bg-gradient-to-br text-white text-2xl font-bold font-[Merriweather] text-center w-full h-12">
            Proceed to Checkout
        </button>
    </div>
</div>
           </div>
        </>
    );
};

export default OrderPage;