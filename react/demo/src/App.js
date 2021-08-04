import React from "react";
import List from "./List";
import Input from "./Input";


class App extends React.Component{
    state = {
        task:["nothing much", "much nothing"],
        currInp:""
    }
    deleteTask = (sel)=>{
      let currArr = this.state.task;
      let newArr = currArr.filter((el)=>{
          return sel!=el;
      })
      this.setState({task:newArr});
    }

    handleChange = (value)=>{
      this.setState({currInp:value});
    }
    handleTask = () => {
      this.setState({task:[...this.state.task, this.state.currInp]});
      this.setState({currInp:""});
    }

    render = () => {
        return (
            <div>
                <Input handleChange={this.handleChange} handleTask = {this.handleTask} currInp = {this.state.currInp} />
                <List tasks={this.state.task} deleteTask={this.deleteTask}/>
            </div>
        );
    }
}

export default App;