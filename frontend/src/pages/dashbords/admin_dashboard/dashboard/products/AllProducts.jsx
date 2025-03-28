import React, { useState, useEffect } from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

import { BACKEND_URL } from '../../../../../utils';
import { LOCAL_BACKEND_URL } from '../../../../../local_backend_url';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", description: "", stock: "", images: [] });
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/products/getAllProducts`);
                setProducts(response.data.products);
            } catch (error) {
                setError("Failed to load products.");
                console.error("Fetch Products Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`${BACKEND_URL}/api/products/deleteProduct/${productId}`);
            const updatedProducts = products.filter((product) => product._id !== productId);
            setProducts(updatedProducts);
            toast.success("Product deleted successfully!");
            
            if (updatedProducts.length <= (currentPage - 1) * productsPerPage) {
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete product.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("category", newProduct.category);
        formData.append("stock", newProduct.stock);

        Array.from(selectedImages).forEach((file) => {
            formData.append("image", file);
        });

        try {
            const response = await axios.post(`${BACKEND_URL}/api/products/createProduct`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProducts([...products, response.data.product]);
            toast.success("Product added successfully!");
            setShowModal(false);
            setNewProduct({ name: "", category: "", price: "", description: "", stock: "", images: [] });
            setSelectedImages([]);
        } catch (error) {
            console.error("Upload Error:", error);
            toast.error("Failed to add product.");
        } finally {
            setUploading(false);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>All Products</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    <MdAdd /> Upload Product
                </Button>
            </div>

            {error && <p className="text-danger">{error}</p>}
            {loading ? (
                <p>Loading products...</p>
            ) : currentProducts.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        {product.image.map((img, index) => (
                                            <img key={index} src={img.url} alt={product.name} style={{ width: "50px", height: "50px", marginRight: "5px" }} />
                                        ))}
                                    </td>
                                    <td>
                                        <button className="btn btn-link text-danger" onClick={() => handleDelete(product._id)}>
                                            <MdDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
                                <li key={number} className="page-item">
                                    <button onClick={() => paginate(number + 1)} className="page-link">
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            ) : (
                <p>No products available.</p>
            )}

            {/* Upload Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpload}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" value={newProduct.category} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={newProduct.description} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="file" multiple onChange={handleImageChange} required />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" disabled={uploading}>
                                {uploading ? "Uploading..." : "Upload"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}






