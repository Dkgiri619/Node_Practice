import React from "react";
import List from "./List";

class App extends React.Component{
    state = {
        task:["nothing much", "much nothing"],
        currInp:""
    }
    render = () => {
        return (
            <div>
                <input type="text" onChange={(e)=>{
                  this.setState({currInp:e.currentTarget.value})
                }} onKeyDown={(e)=>{
                  if(e.key=="Enter"){
                    this.setState({task:[...this.state.task, this.state.currInp],
                    currInp:""});
                  }
                }} value={this.state.currInp}></input>
                <List tasks={this.state.task}/>
            </div>
        );
    }
}

export default App;