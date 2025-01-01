import React from 'react'

function Header() {
    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center text-center p-5">
                {/* Logo Section */}
                <div className="col-12 col-md-4 col-lg-3">
                    <div className="logo">
                        <img src="../logo.png" className="logo-image" alt="Math Guru Abacus Logo" />
                    </div>
                </div>
                {/* Text Section */}
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="heading-text">
                        <h1 className="display-4 mgTittle">MATH GURU ABACUS</h1>
                        <p className="mb-1 first"> Regd. under T.M. Act, Govt India ISO 9001:2015 Certified Organization</p>
                        <h5> Abacus learning is essential as it enhances mental math skills, concentration, and cognitive development in children.</h5>
                    </div>
                </div>
                {/* ISO Image Section */}
                <div className="col-12 col-lg-3">
                    <div className="iso-image">
                        <img src="../iso.png" className='iso' alt="ISO Certification" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Header