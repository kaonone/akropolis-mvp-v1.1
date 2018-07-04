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

        const checkedProduct: Product[] = this.props.data.filter((product: Product) => {
            return product.id === this.state.idOfcheckedProduct;
        });

        const listOfProducts = this.props.data.map((product: Product, index: number) => {
            return (
                <ProductRowComponent
                    productData={product} key={index}
                    onClickProduct={this.handleOnClickProduct}
                    idOfcheckedProduct={this.state.idOfcheckedProduct}
                />
            );
        });

        const initialContributionBtn = this.state.idOfcheckedProduct !== undefined ?
            (
                <>
                    <div className="v-products__wrapper-options"><FormattedMessage id="myProducts.upTo" />
                        <h1 className="v-products__value-of-options">{checkedProduct[0].fundPercent}% </h1>
                        <FormattedMessage id="myProducts.returns" />
                    </div>
                    <FormattedMessage id="myProducts.makeInitialContribution">
                        {(makeInitialContribution: string) => <button className="o-btn o-btn--wide">{makeInitialContribution}</button>}
                    </FormattedMessage>
                </>
            ) : null;

        return (
            <div className="v-products">
                <h1 className="v-products__headline"><FormattedMessage id="nav.myProducts" /></h1>
                {listOfProducts}
                {initialContributionBtn}
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
