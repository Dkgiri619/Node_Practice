import React from "react";

class MyComp extends React.Component{
    state = {
        integer:2
    }
    render = () => {
        return (
            <div>
                <button onClick = {()=>{this.setState({integer: this.state.integer+1})}}>Increment</button>
                <button onClick = {()=>{this.setState({integer: this.state.integer-1})}}>Decrement</button>
                <h1> {this.state.integer}</h1>
            </div>
        );
    }
}

export default MyComp;