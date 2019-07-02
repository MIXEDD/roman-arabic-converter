import React, {Component} from 'react';
import './App.css';
import ConverterLayout from './HOC/ConverterLayout/ConverterLayout';

class App extends Component {

  render() {
    return(
        <div className="App">
            <ConverterLayout/>
        </div>
    );
  }
}

export default App;
