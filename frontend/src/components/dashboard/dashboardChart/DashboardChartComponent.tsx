import * as React from "react";
import { Line } from "react-chartjs-2";

import { Commitment } from "../../../models/Commitment";
import { prepareChartData } from "../../../services/DashboardService";

interface Props {
    commitment: Commitment;
}

export default class DashboardChartComponent extends React.Component<Props, {}> {

    public render() {
        const { period, pastAnnualReturns, durationInYears, createdAt, amountToPay } = this.props.commitment;
        const chartData = prepareChartData(createdAt, durationInYears, amountToPay, period, pastAnnualReturns);

        const data = {
            datasets: [{
                backgroundColor: [
                    "rgba(0, 0, 0, 0.2)",
                ],
                borderColor: [
                    "rgba(0, 0, 0, 1)",
                ],
                borderWidth: 1,
                data: chartData.data,
                label: "ETH",
            }],
            labels: chartData.labels,
        };

        const options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "ETH"
                    }
                }]
            }
        };

        return (
            <Line data={data} options={options}/>
        );
    }
}
