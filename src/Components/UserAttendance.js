import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const UserAttendance = () => {
    const state = useSelector(state => state)
    const allUserDetails = state?.allUserDetails
    const allUserValues = Object.values(allUserDetails)

    return (
        <div>
            <div>

                <br />

                <h3> User Attendance Here</h3>
                <br />
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "50px" }}>
                        <select style={{ padding: "10px", fontSize: "20px" }} onChange={e => { console.log(e.target.value) }}>
                            {allUserValues.map((item) => {
                                return <option >{item.firstName}</option>
                            })}
                        </select>
                    </div>
                    <div style={{ marginRight: "50px" }}>
                        <select style={{ padding: "10px", marginRight: "5px", fontSize: "20px" }} onChange={e => { console.log(e.target.value) }}>
                            <option value="">Period</option>
                            <option value="United Kingdom">Current Month</option>
                            <option value="Netherlands">Last Month</option>
                            <option value="Austria">Past 3 Months</option>
                            <option value="Germany">Since joining</option>
                        </select>
                    </div>
                    <Button variant="info" stle={{ height: "2.3em !important", width: "8em !important", fontSize: "20px !important" }}>Generate</Button>
                </div>
            </div>
            
            <div style={{marginTop:"5em"}}>
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

        </div>
    )
}
