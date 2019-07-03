import React, {Component} from 'react';
import './Converter.css';
import Select from 'react-select'

class Converter extends Component{

    state = {
        available_methods_of_conversion: [{value:'roman_arabic', label: 'Roman to arabic'}, {value: 'arabic_roman', label: 'Arabic to roman'}],
        selected_mode: null,
        input_val: '',
        result: null,
        errorMessage: null,
        roman_numbers: {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1}

};
    // clears result and errors
    clearResultAndErrors = () => {
        if(this.state.result !== null) this.setState({result: null});
        if(this.state.errorMessage !== null) this.setState({errorMessage: null});
    };

    // handles selector change selection
    handleChangeSelection = (selectedOption) => {
       this.setState({selected_mode: selectedOption.value});
       this.clearResultAndErrors();
    };
    // updates input value onto the state
    // clears any unnecessary ui info
    updateInputValue = (e) => {
        this.setState({input_val: e.target.value});
        this.clearResultAndErrors();
    };

    // checks for arabic number user input
    // number must be whole
    // number must be positive and not equal to zero
    // number must be withing range [1-3999]
    handleArabicInputValidity = (input) => {
        if(!RegExp('^[1-9]\\d*$').test(this.state.input_val)) {
            this.setState({errorMessage: 'Incorrect input'});
            return false;
        } else if(input > 3999) {
            this.setState({errorMessage: 'Number is too large'});
            return false;
        }

        return true;
    };

    // convert arabic to roman numeral system
    convertArabicToRoman = () => {
        let result = '';
        let input = parseFloat(this.state.input_val);

        if(this.handleArabicInputValidity(input)) {
            for(let i in this.state.roman_numbers) {
                while (input >= this.state.roman_numbers[i]) {
                    result += i;
                    input -= this.state.roman_numbers[i];
                }
            }

            this.setState({result: result});
        }
    };

    // reusable function for looping through roman_numers array
    // used for finding roman letter in the array
    // used by function formatRomanInput
    romanToArabicConverter = (letter) => {
        for(let i in this.state.roman_numbers) {
            if(letter === i) {
                return this.state.roman_numbers[i];
            }
        }

        return false;
    };

    // validates roman input
    validateRomanInput = (input) => {
          const regex = RegExp('^M{0,3}(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$');
          const testResult = regex.test(input);
          if(!testResult) this.setState({errorMessage: 'Invalid roman numeral'});

          return testResult;
    };

    // converts roman to arabic
    convertRomanToArabic = () => {
        const isValidInput = this.validateRomanInput(this.state.input_val.toUpperCase());
        if(isValidInput) {
            const input = this.state.input_val.toUpperCase().split('');
            let result = 0;
            let letterPosition = 0;

            for(let i = 0; i < input.length; i++) {
                if(i < letterPosition) continue;
                const currentVal = `${input[i]}${input[i + 1] !== undefined ? input[i + 1] : ''}`;
                const number = this.romanToArabicConverter(currentVal);
                if(number !== false) {
                    result += number;

                    if(input[i + 2] !== undefined) {
                        letterPosition = i + 2;
                    } else break;
                }
                else {
                    const number = this.romanToArabicConverter(input[i]);
                    result += number;
                }
            }

            this.setState({result:result});
        }
    };

    // launches on convert button click
    // launches the correct conversion method
    convert = () => {
        if(this.state.selected_mode === 'roman_arabic') this.convertRomanToArabic();
        else if(this.state.selected_mode === 'arabic_roman') this.convertArabicToRoman();
    };

    render() {
        const buttonClass = this.state.input_val !== '' ? '' : 'disabled';

        return(
            <div className="converter">
                <h1>Roman/arabic converter</h1>
                <Select
                    options={this.state.available_methods_of_conversion}
                    onChange={this.handleChangeSelection}
                />
                <div className="input-block">
                    <input type="text" value={this.state.input_val} onChange={(e) => this.updateInputValue(e)} disabled={this.state.selected_mode !== null ? false : true}/>
                    <p className="error">{this.state.errorMessage}</p>
                </div>
                <button onClick={this.convert} className={buttonClass}>Convert</button>

                { this.state.result !== null ? <p>Result: <span>{this.state.result}</span></p> : null }
            </div>
        );
    }
}

export default Converter;