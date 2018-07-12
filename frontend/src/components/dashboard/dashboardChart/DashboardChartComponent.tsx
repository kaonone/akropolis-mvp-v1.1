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
        const primaryColor = "rgba(108, 100, 255, 1)";
        const secondaryColor = "rgba(45, 216, 152, 1)";

        const data = (canvas: any) => {

            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "rgba(45, 216, 152, 0.5)");
            gradient.addColorStop(1, "rgba(108, 100, 255, 0.5)");

            return {
                datasets: [{
                    backgroundColor: gradient
                    ,
                    borderColor: [
                        secondaryColor,
                    ],
                    borderWidth: 4,
                    data: chartData.data,
                    label: "ETH",
                    pointBorderColor: secondaryColor
                }],
                labels: chartData.labels,

            };
        };

        const options = {
            layout: {
                padding: {
                    bottom: 0,
                    left: 20,
                    right: 20,
                    top: 20,
                }
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Time"
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Value (ETH)"
                    },
                    ticks: {
                        display: true
                    },
                }]
            },
            tooltips: {
                backgroundColor: primaryColor,
                borderColor: "blue",
            }
        };

        return (
            <Line data={data} options={options} />
        );
    }
}
