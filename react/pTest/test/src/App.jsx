import React from "react";
import Keypad from "./Keypad";
import "./App.css";
import Screen from "./Screen";
import Functions from "./Functions";

class App extends React.Component {
    state = {
        currInp: ""
    }
    changeState = (val) => {
        this.setState({ currInp: this.state.currInp+val });
    }
    evaluate = () => {
        this.setState({currInp : eval(this.state.currInp)});
    }
    startNew = () => {
        this.setState({currInp : ""});
    }
    render = () => {
        return (
        < div className="main" >
            <Screen currInp = {this.state.currInp}/>
            <Functions changeState = {this.changeState} evaluate = {this.evaluate} />
            <Keypad changeState = {this.changeState} startNew = {this.startNew}/>
        </div>
        );
    }
}

export default App;