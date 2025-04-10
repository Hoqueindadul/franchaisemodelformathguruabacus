import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaAngleRight } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import Invoice from '../payments/Invoice';

const ProductPaymentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMode: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [transaction, setTransaction] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('orderDetails'));
    if (storedOrder) {
      setOrderDetails(storedOrder);
      setFormData(prev => ({
        ...prev,
        name: storedOrder.address.name || '',
        email: '',
        paymentMode: '',
      }));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.paymentMode) newErrors.paymentMode = 'Please select a payment mode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && orderDetails) {
      const newTransaction = {
        ...formData,
        id: uuidv4(),
        date: new Date().toISOString(),
        amount: orderDetails.totalPayable,
        productName: orderDetails.cart.map(item => item.name).join(", "),
        items: orderDetails.cart,
        shippingAddress: orderDetails.address,
      };
      setTransaction(newTransaction);
      setIsDownloaded(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Inline validation
    if (name === "name" && !value.trim()) {
      setErrors(prev => ({ ...prev, name: "Name is required" }));
    } else if (name === "email" && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setErrors(prev => ({ ...prev, email: "Invalid email" }));
    } else if (name === "paymentMode" && !value) {
      setErrors(prev => ({ ...prev, paymentMode: "Please select a payment mode" }));
    } else {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleDownload = () => {
    if (window.confirm("Are you sure you want to download the receipt?")) {
      setTimeout(() => {
        alert("Receipt downloaded successfully!");
        setTransaction(null);
        setIsDownloaded(true);
        setFormData({ name: '', email: '', paymentMode: '' });
        navigate("/buymaterials")
      }, 1000);
    }
  };

  if (!orderDetails) {
    return (
      <div className="container mt-4">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="educate_link_btn backToHomeFromFeesCollection color-primary h6 mb-48">
        <FaAngleRight /> Back To Home
      </Link>

      <div className="card p-4 mt-3">
        <h3 className="text-center mb-4">Product Payment</h3>

        <div className="mb-3">
          <strong>Products:</strong> {orderDetails.cart.map(item => item.name).join(", ")}
        </div>
        <div className="mb-3">
          <strong>Total Amount:</strong> ₹{orderDetails.totalPayable}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Mode</label>
            <select
              name="paymentMode"
              className={`form-control ${errors.paymentMode ? 'is-invalid' : ''}`}
              value={formData.paymentMode}
              onChange={handleChange}
            >
              <option value="">-- Select Payment Mode --</option>
              <option value="UPI">UPI</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            {errors.paymentMode && <div className="invalid-feedback">{errors.paymentMode}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={!!transaction}>
            {transaction ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {transaction && !isDownloaded && (
          <div className="text-center mt-4">
            <PDFDownloadLink
              document={<Invoice transaction={transaction} />}
              fileName={`receipt_${transaction.id}.pdf`}
              className="btn btn-success"
              onClick={handleDownload}
            >
              {({ loading }) => (loading ? 'Generating...' : 'Download Receipt')}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPaymentForm;
