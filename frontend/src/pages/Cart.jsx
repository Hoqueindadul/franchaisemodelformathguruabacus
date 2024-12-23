import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Cart() {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
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
                .filter((item) => item.quantity > 0) // Ensure no item has 0 quantity
        );
    };

    // Remove item from cart
    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Calculate total price
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="container my-4">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center my-5">
                    <h4>Your cart is empty!</h4>
                    <p>Add items to your cart to see them here.</p>
                    <Link to="/buymaterials" className="btn btn-primary">
                        Go to Materials
                    </Link>
                </div>
            ) : (
                <Row className="addToCartContainter">
                    {/* Left side: Cart items */}
                    <Col md={8}>
                        <Row xs={1} md={2} xl={3} className="g-4">
                            {cart.map((item) => (
                                <Col key={item.id}>
                                    <Card className="card">
                                        <Card.Img
                                            variant="top"
                                            className="card-image"
                                            src={item.image}
                                        />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>
                                                Price: ₹{item.price} <br />
                                                Quantity: {item.quantity}
                                            </Card.Text>
                                            <div className="d-flex justify-content-between align-items-center">
                                                {/* Quantity and Remove Button */}
                                                <div className="d-flex align-items-center ">
                                                    <button
                                                        className="btn btn-sm removeItem ms-1"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                    {/* Decrease Quantity Button */}
                                                    <button
                                                        className="btn btn-sm btn-secondary me-2"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    {/* Increase Quantity Button */}
                                                    <button
                                                        className="btn btn-sm btn-secondary ms-2"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                    {/* Remove Button */}

                                                </div>

                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Right side: Order Summary */}
                    <Col md={4}>
                        <div className="p-3 border rounded">
                            <h5>Order Summary</h5>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="d-flex justify-content-between mb-2"
                                >
                                    <div>
                                        <strong>{item.title}</strong>
                                        <br />
                                        <small>₹{item.price}</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span>{item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <h5>Total: ₹{totalPrice}</h5>
                            <button className="btn orderNow w-100 mt-3">Order Now</button>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
}
