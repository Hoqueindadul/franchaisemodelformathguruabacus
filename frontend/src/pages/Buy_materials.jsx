import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toast from 'react-hot-toast';
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";
import { useAuth } from '../context/AuthProvider';
import { BACKEND_URL } from "../utils.js";

export default function BuyMaterials() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/products/getAllProducts`);
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.error("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products");
            } finally {
                setIsLoading(false)
            }
        };

        fetchProducts();
    }, []);

    // Load cart from localStorage
    useEffect(() => {
        window.scrollTo(0, 0);
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Add to cart logic
    const addToCart = (product) => {

        if (!isAuthenticated) {
            alert("Please login to add items to your cart.");
            navigate("/login");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product._id,
                name: product.name,
                image: product.image[0].url,
                price: product.price,
                quantity: 1,
                color: product.color || "silver"  // Default/fallback color
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart); // Update state to trigger re-render
        toast.success(`${product.name} added to cart!`);
    };

    const isItemInCart = (productId) => {
        return cart.some((item) => item.id === productId);
    };

    const handleBuyNow = (product) => {
        localStorage.removeItem("cart"); // Optional: Prevent conflict
        localStorage.setItem("buyNowProduct", JSON.stringify({ ...product, quantity: 1 }));
        navigate("/placeOrder");
    };

    return (
        <div className="container buymaterialMain py-4">
            {isLoading ? (
                <div className="text-center">Loading products...</div>
            ) : (
                <Row xs={1} md={2} xl={3} className="g-4">
                    {products.map((product) => (
                        <Col key={product._id}>
                            <Card className="text-center border-0 shadow-sm" style={{ width: "100%", height: "100%" }}>
                                {product.image.length > 0 && (
                                    <Card.Img
                                        variant="top"
                                        src={product.image[0].url}
                                        alt={product.name}
                                        className="p-3"
                                        style={{
                                            height: "180px",
                                            width: "100%",
                                            objectFit: "contain",
                                            borderRadius: "10px",
                                        }}
                                    />
                                )}
                                <Card.Body>
                                    <div className="productTitle d-flex justify-content-between">
                                        <Link
                                            to={`/productDetails/${encodeURIComponent(product.name)}/${encodeURIComponent(product.image[0].url)}/${product.price}`}
                                            style={{ textDecoration: 'none', color: 'blue' }}
                                        >
                                            <Card.Title as="h6" className="mb-0">{product.name}</Card.Title>
                                        </Link>

                                    </div>
                                    <p className="text-primary fw-bold mb-2 text-start text-black">₹{product.price}</p>


                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn cartBtn btn-outline-primary btn-sm mb-2"
                                    >
                                        <FaBoxOpen className="me-2" />
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() => handleBuyNow(product)}
                                        className="btn cartBtn btn-primary btn-sm w-100"
                                    >
                                        Buy Now
                                    </button>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
