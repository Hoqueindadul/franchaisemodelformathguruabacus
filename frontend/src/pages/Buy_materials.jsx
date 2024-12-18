import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Buy_materials() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='container'>
            <Row xs={1} md={2} xl={3} className="g-4">
                <Col>
                    <Card className='card'>
                        <Card.Img variant="top" className="card-image" src="../material-1.jpg" />
                        <Card.Body>
                            <Card.Title>Abacus</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                            <div className="addToCard-btn">
                                <button className='p-2 rounded addtocard'>ADD TO CART</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='card'>
                        <Card.Img variant="top" className="card-image"src="../material-2.jpg" />
                        <Card.Body>
                            <Card.Title>Bag</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                            <div className="addToCard-btn">
                                <button className='p-2 rounded addtocard'>ADD TO CART</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='card '>
                        <Card.Img variant="top" className="card-image"src="../material-3.jpeg" />
                        <Card.Body>
                            <Card.Title>T-shirt</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                            <div className="addToCard-btn">
                                <button className='p-2 rounded addtocard'>ADD TO CART</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='card'>
                        <Card.Img variant="top" className="card-image"src="../material-4.jpeg" />
                        <Card.Body>
                            <Card.Title>Watch</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </Card.Text>
                            <div className="addToCard-btn">
                                <button className='p-2 rounded addtocard'>ADD TO CART</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>

    )
}
