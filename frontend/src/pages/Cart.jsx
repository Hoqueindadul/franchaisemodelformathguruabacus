import React, { useEffect, useState } from "react";
import { FaTrash, FaHeart, FaMinus, FaPlus, FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [showDeliveryTime, setShowDeliveryTime] = useState(true)

    // Load cart from localStorage on mount
    useEffect(() => {
        localStorage.removeItem("buyNowProduct"); // Clear Buy Now product
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);
    

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            setShowDeliveryTime(true)
        } else {
            localStorage.removeItem("cart");
            setShowDeliveryTime(false)
        }
    }, [cart]);

    // Update quantity
    const updateQuantity = (id, increment) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Remove item
    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container my-4">
            <h2 className="cartTittle">
                <FaCartArrowDown className="fs-2 cartIcon" /> <span>Your</span> Cart
            </h2>

            <section className="h-100 gradient-custom">
                <div className="container">
                    <div className="row d-flex my-4">
                        <div className="col-md-8">
                            <div className="card cartCard mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {cart.length} item(s)</h5>
                                </div>
                                <div className="card-body">
                                    {cart.length === 0 ? (
                                        <p>Your cart is empty.</p>
                                    ) : (
                                        cart.map((item, index) => (
                                            <div key={item.id}>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                        <img
                                                            src={item.image}
                                                            className="w-100"
                                                            alt={item.name}
                                                        />
                                                    </div>

                                                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                        <p><strong>{item.name}</strong></p>
                                                        <p>Color: {item.color}</p>
                                                        {item.size && <p>Size: {item.size}</p>}
                                                        <button
                                                            className="btn cartBtn btn-primary btn-sm me-1 mb-2"
                                                            onClick={() => removeItem(item.id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                        <button className="btn cartBtn btn-danger btn-sm mb-2">
                                                            <FaHeart />
                                                        </button>
                                                    </div>

                                                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                        <div className="d-flex align-items-center mb-4" style={{ maxWidth: 300 }}>
                                                            <button
                                                                className="btn cartBtn btn-primary px-3 me-2"
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                            >
                                                                <FaMinus />
                                                            </button>
                                                            <input
                                                                readOnly
                                                                value={item.quantity}
                                                                type="number"
                                                                className="form-control text-center"
                                                                style={{ width: "60px" }}
                                                            />
                                                            <button
                                                                className="btn cartBtn btn-primary px-3 ms-2"
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                            >
                                                                <FaPlus />
                                                            </button>
                                                        </div>
                                                        <p className="text-start text-md-center">
                                                            <strong>₹{item.price}</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                {index < cart.length - 1 && <hr className="my-4" />}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {showDeliveryTime && (<div className="card cartCard mb-4">
                                <div className="card-body">
                                    <p><strong>Expected shipping delivery</strong></p>
                                    <p className="mb-0">3 - 5 business days</p>
                                </div>
                            </div>)}
                        </div>

                        {/* Summary Section */}
                        <div className="col-md-4">
                            <div className="card cartCard mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                            Products
                                            <span>₹{totalPrice.toFixed(2)}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            Shipping
                                            <span>Free</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between border-0">
                                            <div>
                                                <strong>Total (incl. tax)</strong>
                                            </div>
                                            <span><strong>₹{totalPrice.toFixed(2)}</strong></span>
                                        </li>
                                    </ul>
                                    <Link to={"/placeOrder"}><button className="btn cartBtn btn-primary btn-lg w-100 mt-3">
                                        Place Order
                                    </button></Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
