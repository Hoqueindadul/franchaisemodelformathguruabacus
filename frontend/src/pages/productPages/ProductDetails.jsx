import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaTruck, FaUndo, FaShieldAlt, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';


const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState("silver");
    const [quantity, setQuantity] = useState(1);
    const { productName, productImage, price } = useParams();

    const decodedProductName = decodeURIComponent(productName);
    const decodedProductImage = decodeURIComponent(productImage);
    const productPrice = parseFloat(price); // Convert price to number

    return (
        <div className="container py-5">
            <div className="row">
                {/* Product Images */}
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <img src={decodedProductImage} className="card-img-top" alt="Product" />
                        <div className="card-body">
                            <div className="row g-2">
                                {[1, 2, 3, 4].map((_, index) => (
                                    <div className="col-3" key={index}>
                                        <img src={decodedProductImage} className="img-thumbnail" alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                    <h1 className="h2 mb-3">{decodedProductName}</h1>
                    <div className="mb-3">
                        <span className="h4 me-2"> ₹{productPrice.toFixed(2)}</span>
                        <span className="text-muted text-decoration-line-through">  ₹{(productPrice * 1.25).toFixed(2)}</span>
                        <span className="badge bg-danger ms-2">25% OFF</span>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex align-items-center">
                            <div className="text-warning me-2">
                                {[...Array(4)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                                <FaStarHalfAlt />
                            </div>
                            <span className="text-muted">(128 reviews)</span>
                        </div>
                    </div>

                    <p className="mb-4">Timeless elegance meets modern functionality in this classic timepiece. Features premium materials, water resistance, and sophisticated design.</p>

                    {/* Color Selection */}
                    <div className="mb-4">
                        <h6 className="mb-2">Color</h6>
                        <div className="btn-group" role="group">
                            {["silver", "gold", "black"].map(color => (
                                <React.Fragment key={color}>
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="color"
                                        id={color}
                                        checked={selectedColor === color}
                                        onChange={() => setSelectedColor(color)}
                                    />
                                    <label className="btn productBtn btn-outline-secondary" htmlFor={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <div className="d-flex align-items-center">
                            <label className="me-2">Quantity:</label>
                            <select className="form-select w-auto" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-grid gap-2">
                        <button className="btn productBtn btn-primary" type="button"><FaShoppingCart className="me-2" /> Add to Cart</button>
                        <button className="btn productBtn btn-outline-danger " type="button">
                            Buy Now
                        </button>
                    </div>

                    {/* Producty details */}
                    {/* Course Structure Section */}
                    <section className="mb-5 mt-4">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Product Details</Accordion.Header>
                                <Accordion.Body>
                                    <strong>Type:</strong> <br />
                                    <strong>Ideal For:</strong> <br />
                                    <strong>With Rain Cover:</strong> <br />
                                    <strong>Color Code:</strong> <br />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </section>


                    {/* Additional Info */}
                    <div className="mt-4">
                        <div className="d-flex align-items-center mb-2">
                            <FaTruck className="text-primary me-2" />
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <FaUndo className="text-primary me-2" />
                            <span>30-day return policy</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <FaShieldAlt className="text-primary me-2" />
                            <span>2-year warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
