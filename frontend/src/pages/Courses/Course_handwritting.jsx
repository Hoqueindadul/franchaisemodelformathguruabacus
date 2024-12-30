import React, { useEffect } from 'react'

export default function Course_handwritting() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  return (
    <div>

            <div className="container mt-5 handwritingCourse">
            {/* Header Section */}
             {/* Header Section */}
             <header className="text-center courseHeader mb-5">
                <h1 className="display-4 courseH1">Enhance Your Handwriting with Winaum Learning</h1>
                <p className="lead coursePara">Unlock confidence and brain development through better handwriting.</p>
            </header>

            {/* Benefits Section */}
            <section className="mb-5">
                <h2 className="text-primary">Why Good Handwriting Matters</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi1">✔ Increased confidence and cognitive development</li>
                    <li className="list-group-item lgi2">✔ Enhances academic performance</li>
                    <li className="list-group-item lgi3">✔ Boosts originality and creativity</li>
                    <li className="list-group-item lgi4">✔ Helps students obtain more points</li>
                </ul>
            </section>

            {/* Features Section */}
            <section className="mb-5">
                <h2 className="text-primary">Course Features</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item lgi6">🎓 Live instruction with experienced teachers</li>
                    <li className="list-group-item lgi7">🤝 Personalized attention in small batches</li>
                    <li className="list-group-item lgi8">📜 Certification upon course completion</li>
                </ul>
            </section>

            {/* About the Teachers Section */}
            <section className="mb-5">
                <h2 className="text-primary">Learn from the Experts</h2>
                <p>Our classes are led by Handwriting and Graphology Expert Teachers who are extensively trained and certified, ensuring exceptional guidance and results.</p>
            </section>

            {/* Call to Action Section */}
            <section className="text-center">
                <h2 className="text-primary">Ready to Improve Your Handwriting?</h2>
                <p>Join Winaum Learning today and discover the joy of writing confidently and creatively!</p>
                <button className="btn handwrittingBtn btn-lg">Enroll Now</button>
            </section>
        </div>
            
    </div>
  )
}
