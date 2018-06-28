import * as dev from "../releases/testenv/deployment.json";

const deployment = process.env.REACT_APP_STAGE === "production"
    ? {}
    : dev;

export const config = {
    deployment
};
