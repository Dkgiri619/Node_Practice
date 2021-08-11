import React from "react";

class App extends React.Component{
    componentDidMount (){
        let f = async()=>{
            let result = await fetch("/movies");
            let json = await result.json();
            console.log(json);
        }
        f();
    }
    render = ()=> {
        return (<div>

            </div>);
    }
}

export default App;