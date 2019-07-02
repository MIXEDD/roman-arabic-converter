import React, {Component} from 'react';
import './Converter.css';
import Select from 'react-select'

class Converter extends Component{

    state = {
        available_methods_of_conversion: [{value:'roman_arabic', label: 'Roman to arabic'}, {value: 'arabic_roman', label: 'Arabic to roman'}],
        selected_mode: null,
        input_val: '',
        result: null
    };

    handleChangeSelection = (selectedOption) => {
       console.log(selectedOption);
    };

    updateInputValue = (e) => {
        this.setState({input_val: e.target.value});
    };

    convert = () => {

    };

    render() {


        const buttonClass = this.state.input_val !== '' ? '' : 'disabled';

        return(
            <div className="converter">
                <h1>Roman to arabic converter</h1>
                <Select
                    options={this.state.available_methods_of_conversion}
                    onChange={this.handleChangeSelection}
                />
                <input type="text" value={this.state.input_val} onChange={(e) => this.updateInputValue(e)} disabled={this.state.selected_mode !== null ? false : true}/>
                <button onClick={this.convert} className={buttonClass}>Convert</button>

                { this.state.result !== null ? <p>Result: <span>{this.state.result}</span></p> : null }
            </div>
        );
    }
}

export default Converter;