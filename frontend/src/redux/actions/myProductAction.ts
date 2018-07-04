// import axios from "axios";
import * as constants from "../../constants/actions";
import { Product } from "./../../models/Products";
import {Action} from "./action";

const listOfProductsMockData =
    [
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 0,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 1,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 2,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 3,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 4,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 5,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 6,
        },
        {
            fundDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
            fundName: "Fund name",
            fundPercent: "9",
            fundRating: "4.9",
            fundValueDescription: "Conservative",
            id: 7,
        }
    ];

export function fetchProductsDataAction(): Action<constants.FETCH_PRODUCTS_DATA, Product[]> {
    return {
        payload: listOfProductsMockData,
        type: constants.FETCH_PRODUCTS_DATA,
    };
}
