  import React, { useState, useEffect } from "react";
  import { FaMapMarkerAlt, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";

  export default function PlaceOrder() {
    const [cart, setCart] = useState([]);
    const [isBuyNow, setIsBuyNow] = useState(false);
    const [address, setAddress] = useState(null);
    const [editingAddress, setEditingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({
      name: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
      const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      const savedAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    
      if (buyNowProduct) {
        setCart([buyNowProduct]);
        setIsBuyNow(true);
      } else if (savedCart && savedCart.length > 0) {
        setCart(savedCart);
        setIsBuyNow(false);
      }
    
      if (savedAddress) setAddress(savedAddress);
    }, []);
    
    const handleAddressChange = (e) => {
      setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const saveAddress = () => {
      setAddress(newAddress);
      localStorage.setItem("shippingAddress", JSON.stringify(newAddress));
      setEditingAddress(false);
    };

    const handleContinue = () => {
      if (!address) {
        toast.error("Please enter a delivery address.");
        return;
      }
    
      toast.success("Proceeding to payment...");
    
      const orderDetails = {
        cart,
        address,
        totalPayable,
        totalPrice,
        platformFee
      };
    
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    
      if (isBuyNow) {
        localStorage.removeItem("buyNowProduct");
      } else {
        localStorage.removeItem("cart");
      }
      
    
      navigate("/productPaymentForm");
    };
    

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCharge = 0;
    const platformFee = 3;
    const totalPayable = totalPrice + platformFee;

    return (
      <div className="container my-5">
        <h3 className="mb-4">Place Order</h3>

        {/* Step 2: Delivery Address */}
        <div className="card cartCard mb-3">
          <div className="card-header bg-primary text-white">
            <FaMapMarkerAlt className="me-2" /> Delivery Address
          </div>
          <div className="card-body">
            {editingAddress || !address ? (
              <>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      value={newAddress.name}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="addressLine"
                      value={newAddress.addressLine}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="Address Line"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={saveAddress}>
                  Save Address
                </button>
              </>
            ) : (
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="mb-1">
                    <strong>{address.name}</strong> {address.phone}
                  </p>
                  <p className="mb-0">
                    {address.addressLine}, {address.city}, {address.state} -{" "}
                    {address.pincode}
                  </p>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setEditingAddress(true)}
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Order Summary */}
        <div className="card cartCard mb-3">
          <div className="card-header bg-primary text-white">
            <FaClipboardList className="me-2" /> Order Summary
          </div>
          <div className="card-body">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="d-flex mb-3">
                  <img
                    src={item.image[0]?.url || item.image}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    className="me-3"
                  />
                  <div>
                    <p className="mb-1">
                      <strong>{item.name}</strong>
                    </p>
                    <p className="mb-1">Quantity: {item.quantity}</p>
                    <p className="mb-0 text-success">
                      ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Price Details */}
        <div className="card cartCard">
          <div className="card-header bg-primary text-white">
            <FaMoneyBillWave className="me-2" /> Price Details
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Price ({cart.length} item{cart.length !== 1 && "s"})</span>
                <span>₹{totalPrice}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Delivery Charges</span>
                <span className="text-success">Free</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Total Payable</span>
                <span>₹{totalPayable}</span>
              </li>
            </ul>

            <button className="btn cartBtn btn-warning w-100" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
