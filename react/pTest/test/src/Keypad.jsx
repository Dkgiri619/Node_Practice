import './Keypad.css'
let Keypad = (props) => {
    return (       
        <div className="keypads">
            <button className="butt" onClick = {()=>{
                props.changeState(0);
            }} >{0}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(1);
            }} >{1}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(2);
            }} >{2}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(3);
            }} >{3}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(4);
            }} >{4}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(5);
            }} >{5}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(6);
            }} >{6} </button>
            <button className="butt" onClick = {()=>{
                props.changeState(7);
            }} >{7}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(8);
            }} >{8}</button>
            <button className="butt" onClick = {()=>{
                props.changeState(9);
            }} >{9}</button>
            <button className="butt" onClick = {()=>{
                props.startNew();
            }}>C</button>
        </div>     
    );
}
export default Keypad;