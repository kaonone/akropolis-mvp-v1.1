import * as React from "react";
import { FormattedMessage } from "react-intl";
import ProductRowComponent from "../../components/productRowComponent/ProductRowComponent";
import { Product } from "../../models/Products";
import { listOfProductsMockData } from "../../services/mockDataService";

import "./v-products.css";

export default class MyProductsView extends React.Component<any, any> {

    public render() {
        
        const listOfProducts = listOfProductsMockData.map((product: Product, index: number) => {
            return <ProductRowComponent productData={product} key={index}/>;
        });

        return (
            <div className="v-products">
                <h1 className="v-products__headline"><FormattedMessage id="nav.myProducts" /></h1>
                {listOfProducts}
            </div>
        );
    }
}
