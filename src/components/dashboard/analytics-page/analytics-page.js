import React from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { Line } from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';
import { dataCalls, dataMsgs, optionsCalls, optionsMsgs } from './analytics-data-page';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>

                <MDBTypography style={{ fontSize: "35px", marginBottom: "20px", fontWeight: "500", textAlign: "center" }}>Amount Analytics</MDBTypography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <MDBCard style={{ margin: "auto auto 30px auto", width: "80%", height: "55vh", marginRight: "20px" }} >
                        <MDBCardBody>
                            <div style={{ width: "95%", height: "90% !important", padding: "30px" }}>
                                <Line options={optionsMsgs} data={dataMsgs} />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard style={{ margin: "auto auto 30px auto", width: "80%", height: "55vh" }} >
                        <MDBCardBody>
                            <div style={{ width: "95%", height: "70% !important", padding: "30px" }}>
                                <Line options={optionsCalls} data={dataCalls} />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>

        )
    }

}
export default Analytics;
