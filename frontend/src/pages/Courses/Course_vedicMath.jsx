import React, { useEffect } from 'react'

export default function Course_vedicMath() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container vedicMathCourse mt-5">
            {/* Header Section */}
            <header className="text-center courseHeader mb-5">
                <h1 className="display-4 courseH1">Discover the Power of Vedic Mathematics</h1>
                <p className="lead coursePara">Simplify calculations and enhance mental math skills with ancient techniques.</p>
            </header>

            {/* Introduction Section */}
            <section className="mb-5">
                <h2 className="text-primary">What is Vedic Math?</h2>
                <p>
                    Vedic Maths is a system of mathematics rediscovered from the Vedas by Indian mathematician Jagadguru Shri Bharati Krishna Tirthaji.
                    It includes various techniques aimed at simplifying calculations and enhancing mathematical understanding.
                </p>
            </section>

            {/* Benefits Section */}
            <section className="mb-5">
                <h2 className="text-primary">Benefits of Vedic Mathematics</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi1">✔ Speed and Accuracy</li>
                    <li className="list-group-item lgi3">✔ Simple and Easy to Use</li>
                    <li className="list-group-item lgi4">✔ Systematic Development of Brain</li>
                    <li className="list-group-item lgi5">✔ Develops Creativity</li>
                    <li className="list-group-item lgi6">✔ Improves Memory and Retention</li>
                    <li className="list-group-item lgi7">✔ Improves Concentration</li>
                </ul>
            </section>

            {/* Syllabus Section */}
            {/* Syllabus for Grade 2-5 */}
            <section className="mb-5">
                <h2 className="text-primary">Vedic Math Syllabus for Grade 2-5</h2>
                <div className="row">
                    {/* Foundation Addition */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header addCard text-white">Foundation Addition</div>
                            <div className="card-body">
                                <ul>
                                    <li>Number Sense for Addition</li>
                                    <li>Mental Maths Addition</li>
                                    <li>Rapid Addition- Single to Double-Digit</li>
                                    <li>Rapid Addition- Double to Double-Digit</li>
                                    <li>Rapid Addition- Triple to Triple-Digit</li>
                                    <li>Left to Right Addition</li>
                                    <li>Number Splitting</li>
                                    <li>Adding 10 to Numbers</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Subtraction */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header subtractCard text-white">Foundation Subtraction</div>
                            <div className="card-body">
                                <ul>
                                    <li>Number Sense for Subtraction</li>
                                    <li>Mental Maths Subtraction</li>
                                    <li>Complement</li>
                                    <li>Subtraction Using Complements</li>
                                    <li>Subtraction of Two-Digit Numbers</li>
                                    <li>Subtraction of Double-Digit Numbers</li>
                                    <li>Subtraction of Triple Digit Numbers</li>
                                    <li>Subtraction using Nikliam</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Multiplication */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header multiCard text-white">Foundation Multiplication</div>
                            <div className="card-body">
                                <ul>
                                    <li>Introduction of Multiplication</li>
                                    <li>Table of 2-25</li>
                                    <li>Mental Maths Multiplication</li>
                                    <li>Traditional Multiplication</li>
                                    <li>Multiplication with Tricks</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Division */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header diviCard text-white">Foundation Division</div>
                            <div className="card-body">
                                <ul>
                                    <li>Introduction of Division</li>
                                    <li>Warmup for Division</li>
                                    <li>Traditional Division</li>
                                    <li>Division by 10, 100, or 1000</li>
                                    <li>Mental Maths Division</li>
                                    <li>Basic Word Problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Syllabus for Grade 6 and above */}
            <section>
                <h2 className="text-primary">Vedic Math Syllabus for Grade 6 and above</h2>
                <div className="row">
                    {/* Level 1 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level1 text-white">Level 1</div>
                            <div className="card-body">
                                <ul>
                                    <li>Number Sense for Addition</li>
                                    <li>Mental Maths Addition</li>
                                    <li>Addition with numbers near 10</li>
                                    <li>Left to Right Addition</li>
                                    <li>Rapid Addition</li>
                                    <li>Number Splitting</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Level 2 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level2 text-white">Level 2</div>
                            <div className="card-body">
                                <ul>
                                    <li>Subtraction Warmups</li>
                                    <li>Mental Maths Subtraction</li>
                                    <li>Subtraction using Nikilam</li>
                                    <li>Introduction to Multiplication</li>
                                    <li>Simple Multiplication</li>
                                    <li>Introduction to Division</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Level 3 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level3 text-white">Level 3</div>
                            <div className="card-body">
                                <ul>
                                    <li>Multiplication of Two-digit numbers</li>
                                    <li>Multiplication by 11</li>
                                    <li>Multiplication by Base Numbers</li>
                                    <li>Criss-Cross Method</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Level 4 */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-header level4 text-white">Level 4</div>
                            <div className="card-body">
                                <ul>
                                    <li>Digital Roots</li>
                                    <li>Divisibility</li>
                                    <li>Fractions</li>
                                    <li>Squares and Cubes</li>
                                    <li>Square and Cube Roots</li>
                                    <li>Division of Double-Digit Numbers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </div>
    )
}
