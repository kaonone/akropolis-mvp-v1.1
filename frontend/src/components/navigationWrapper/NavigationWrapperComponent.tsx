import * as React from "react";
import * as ReactDOM from "react-dom";

import "./c-navigation-wrapper.css";

const modalElement = document.getElementById("navigation") as HTMLElement;

export default class NavigationWrapperComponent extends React.Component<any, {}> {

    private wrapperModal = document.createElement("div");

    public render() {
        return ReactDOM.createPortal(
            <div className="c-navigation-wrapper">
                {this.props.children}
            </div>,
            this.wrapperModal,
        );
    }

    public componentDidMount() {
        modalElement.appendChild(this.wrapperModal);
    }

    public componentWillUnmount() {
        modalElement.removeChild(this.wrapperModal);
    }
}
