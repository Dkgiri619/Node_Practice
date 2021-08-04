import "./Functions.css";
let Functions = (props)=>{
    return (
        <div className="functions">
            <button className="func-butt" onClick = {()=>{
                props.changeState("+")
            }} >+</button>
            <button className="func-butt" onClick = {()=>{
                props.changeState("-")
            }} >-</button>
            <button className="func-butt" onClick = {()=>{
                props.changeState("*")
            }} >*</button>
            <button className="func-butt" onClick = {()=>{
                props.changeState("/")
            }} >/</button>
            <button className="func-butt" onClick = {()=>{
                props.evaluate();
            }}>=</button>
        </div>
    );
}
export default Functions;