import * as React from "react";
import * as ReactDOM from "react-dom";

import "./c-modal-global.css";

const modalElement = document.getElementById("modal") as HTMLElement;

interface Props {
    isAbove?: boolean;
    onClose: () => void;
    areBottomOptions?: boolean;
    isBackground?: boolean;
}

export default class ModalGlobalComponent extends React.Component<Props, {}> {

    private wrapperModal = document.createElement("div");

    public render() {
        
        return ReactDOM.createPortal(
            <div className={`c-modal-global__overlay ${this.props.isAbove ? "c-modal-global__overlay--no-overlay" : ""}`} onClick={this.props.onClose}>
                <div className="c-modal-global__wrapper-height">
                    <div onClick={this.eventStopPropagation} className="c-modal-global__wrapper">
                        <div className={`c-modal-global__wrapper-content 
                        ${this.props.areBottomOptions ? "c-modal-global__wrapper-content--reset-margin-bottom" : ""}
                        ${this.props.isBackground ? "c-modal-global__wrapper-content--reset-attribute" : ""}`
                        }>
                            {this.props.children}
                        </div>
                    </div>
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
