import * as React from "react";
import * as ReactDOM from "react-dom";

import "./c-modal-global.css";

const modalElement = document.getElementById("modal") as HTMLElement;

export default class ModalGlobalComponent extends React.Component<any, {}> {

    private wrapperModal = document.createElement("div");

    public render() {
        return ReactDOM.createPortal(
            <div className="c-modal-global__overlay" onClick={this.props.onClose}>
                <div onClick={this.eventStopPropagation} className="c-modal-global__wrapper">
                    {this.props.children}
                </div>
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

    private eventStopPropagation(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }
}
