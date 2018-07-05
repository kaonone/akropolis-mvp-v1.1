import * as prod from "../releases/ropsten/deployment.json";
import * as dev from "../releases/testenv/deployment.json";

const deployment = process.env.REACT_APP_STAGE === "prod"
    ? prod
    : dev;

const network = process.env.REACT_APP_STAGE === "prod"
    ? "ROPSTEN"
    : "";

export const config = {
    deployment,
    network,
};
