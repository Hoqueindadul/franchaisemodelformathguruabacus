import React from 'react'

function Header() {
    return (
        <div className="container">
        <div className="row align-items-center justify-content-center text-center">
            {/* Logo Section */}
            <div className="col-12 col-md-4 col-lg-3">
                <div className="logo">
                    <img src="../logo.png" className="logo-image" alt="Math Guru Abacus Logo" />
                </div>
            </div>
            {/* Text Section */}
            <div className="col-12 col-md-8 col-lg-6">
                <div className="heading-text">
                    <h1 className="display-4">Math Guru Abacus</h1>
                    <h5 className="mb-1">Regd. under T.M. Act Govt INDIA</h5>
                    <h5>ISO 9001:2015 Certified Organization</h5>
                </div>
            </div>
            {/* ISO Image Section */}
            <div className="col-12 col-lg-3">
                <div className="iso-image">
                    <img src="../iso.jpeg" alt="ISO Certification" />
                </div>
            </div>
        </div>
    </div>
    
    
    )
}

export default Header