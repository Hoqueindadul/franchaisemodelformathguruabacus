import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toast from 'react-hot-toast';

export default function BuyMaterials() {
  const [cart, setCart] = useState([]); // Use state to track cart
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart); // Load cart from localStorage
  }, []);

  const products = [
    {
      id: 1,
      title: "Abacus",
      image: "../material-1.jpg",
      price: 500,
      description:
        "This is a longer card with supporting text below as a natural lead-in to additional content.",
    },
    {
      id: 2,
      title: "Bag",
      image: "../material-2.jpg",
      price: 300,
      description:
        "This is a longer card with supporting text below as a natural lead-in to additional content.",
    },
    {
      id: 3,
      title: "T-shirt",
      image: "../material-3.jpeg",
      price: 700,
      description:
        "This is a longer card with supporting text below as a natural lead-in to additional content.",
    },
    {
      id: 4,
      title: "Watch",
      image: "../material-4.jpeg",
      price: 1200,
      description:
        "This is a longer card with supporting text below as a natural lead-in to additional content.",
    },
  ];

  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = savedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      savedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));
    setCart(savedCart); // Update cart state
    toast.success(`${product.title} added to your cart!`);
  };

  // Function to check if the item is in the cart
  const isItemInCart = (productId) => {
    return cart.some((item) => item.id === productId); // Use state for checking if item is in cart
  };

  return (
    <div className="container buymaterialMain">
      <Link to="/cart"><button className="yourCart float-end">Your Cart</button></Link>
      <Row xs={1} md={2} xl={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="card">
              <Card.Img variant="top" className="card-image" src={product.image} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span>₹{product.price}</span>
                  <button
                    className="btn addtocart"
                    onClick={() => addToCart(product)}
                    disabled={isItemInCart(product.id)} // Disable button if item is in the cart
                  >
                    {isItemInCart(product.id) ? "Already in Cart" : "Add to Cart"}
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
