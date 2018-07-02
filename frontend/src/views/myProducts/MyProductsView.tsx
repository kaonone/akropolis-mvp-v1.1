import * as React from "react";
import { FormattedMessage } from "react-intl";
import ProductRowComponent from "../../components/productRowComponent/ProductRowComponent";
import { Product } from "../../models/Products";

import "./v-products.css";

export interface Props {
    data: Product[];
}

export interface PropsFromDispatch {
    fetchProductsData: () => void;
}

interface AllProps extends Props, PropsFromDispatch { }

export default class MyProductsView extends React.Component<AllProps, any> {

    public componentWillMount() {
        this.props.fetchProductsData();
    }

    public render() {

        const listOfProducts = this.props.data.map((product: Product, index: number) => {
            return <ProductRowComponent productData={product} key={index} />;
        });

        return (
            <div className="v-products">
                <h1 className="v-products__headline"><FormattedMessage id="nav.myProducts" /></h1>
                {listOfProducts}
            </div>
        );
    }
}
