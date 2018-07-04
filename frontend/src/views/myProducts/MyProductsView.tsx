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

interface State {
    idOfcheckedProduct: number | undefined;
}

export default class MyProductsView extends React.Component<AllProps, State> {

    public readonly state: State = {
        idOfcheckedProduct: undefined,
    };

    public componentWillMount() {
        this.props.fetchProductsData();
    }

    public render() {

        const listOfProducts = this.props.data.map((product: Product, index: number) => {
            return (
                <ProductRowComponent
                    productData={product} key={index}
                    onClickProduct={this.handleOnClickProduct}
                    idOfcheckedProduct={this.state.idOfcheckedProduct}
                />
            );
        });

        return (
            <div className="v-products">
                <h1 className="v-products__headline"><FormattedMessage id="nav.myProducts" /></h1>
                {listOfProducts}
            </div>
        );
    }

    private handleOnClickProduct = (id: number) => {
        this.setState({
            ...this.state,
            idOfcheckedProduct: id
        });
    }
}
