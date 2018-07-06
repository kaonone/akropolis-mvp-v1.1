import * as React from "react";

import "./c-input-range.css";

interface Props {
    max?: number;
    min?: number;
    step?: number;
    value: number | undefined;
    symbol?: string;
    onChange: (value: number) => void;
}

interface State {
    max: number;
    min: number;
    value: number | undefined;
}

export default class InputRangeComponent extends React.Component<Props, State> {
    public readonly state: State = {
        max: 100,
        min: 0,
        value: 0,
    };

    private range: HTMLInputElement;

    constructor(props: any) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        const max = this.props.max || 100;
        const min = this.props.min || 0;
        const value = this.props.value || 0;
        this.setState({
            ...this.state,
            max,
            min,
            value,
        });

        if (value !== 0) {
            this.setRangeBackground(value, min, max);
        }
    }

    public render() {
        return (
            <div className="c-input-range">
                <input type="range" className="c-input-range__range"
                       ref={(c: HTMLInputElement) => {
                           this.range = c;
                       }} step={this.props.step}
                       max={this.state.max} min={this.state.min} value={this.state.value} onChange={this.onChange}/>
                <span className="c-input-range__symbol">{this.props.symbol}</span>
                <input type="number" className="o-form__input c-input-range__input"
                       value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown}
                       onBlur={this.onBlur}/>
            </div>
        );
    }

    private onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            const min = parseInt(this.range.min, 0);
            const max = parseInt(this.range.max, 0);
            const parsedValue = parseFloat(event.target.value) || 0;
            const value = parsedValue > max ? max : (parsedValue < min ? min : parsedValue);

            this.setState({
                ...this.state,
                value,
            });

            this.setRangeBackground(value, min, max);

            this.props.onChange(value);
        }
    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 69) {
            event.preventDefault();
        }
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            const min = parseInt(this.range.min, 0);
            const max = parseInt(this.range.max, 0);
            const parsedValue = parseFloat(event.target.value) || 0;
            const value = parsedValue > max ? max : (parsedValue < min ? min : parsedValue);

            this.setState({
                ...this.state,
                value,
            });

            this.setRangeBackground(value, min, max);

            this.props.onChange(value);
        } else {
            this.setState({
                ...this.state,
                value: undefined,
            });
        }
    }

    private setRangeBackground(value: number, min: number, max: number) {
        const val = ((value - min) / (max - min)) * 100;
        this.range.style.background = "linear-gradient(to right, #484848, #484848 " + val + "%, #e4e4e4 " + val + "%)";
    }
}
