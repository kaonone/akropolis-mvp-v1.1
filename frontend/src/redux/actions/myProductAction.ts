// import axios from "axios";
import * as constants from "../../constants/actions";
import { Product } from "./../../models/Products";
import {Action} from "./action";

const listOfProductsMockData =
    [
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        },
        {
            fundDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing el...",
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative"
        }
    ];

export function fetchProductsDataAction(): Action<constants.FETCH_PRODUCTS_DATA, Product[]> {
    return {
        payload: listOfProductsMockData,
        type: constants.FETCH_PRODUCTS_DATA,
    };
}
