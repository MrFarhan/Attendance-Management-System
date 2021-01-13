import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const UserAttendance = () => {
    const state = useSelector(state => state)
    console.log(state, "state issssssssss in userattendance")
    return (
        <div>
            <br/>

            <h3> User Attendance Here</h3>
            <br/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                        <th>Total time utilized</th>
                        <th>Total time required</th>
                        <th>Excess/Short</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td >Larry the Bird</td>
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
