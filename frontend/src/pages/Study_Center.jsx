import React from 'react';
import Table from 'react-bootstrap/Table';

export default function Tables() {
    return (
        <div className="container table-main p-4 mt-4">
            {/* Wrap table with a div for rounded corners */}
     
                <Table striped bordered>
                    <thead className='thead-dark'>
                        <tr>
                            <th className="bg-dark text-light" scope="col">Centre Code</th>
                            <th className="bg-dark text-light" scope="col">Centre Name</th>
                            <th className="bg-dark text-light" scope="col">Director Name</th>
                            <th className="bg-dark text-light" scope="col">Address</th>
                            <th className="bg-dark text-light" scope="col">District State</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody> */}
                </Table>
        </div>
    );
}
