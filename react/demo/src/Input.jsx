let Input = (props) => {
    return (
        <input type="text" 
        onChange={(e) => {
            props.handleChange(e.target.value);
        }} 

        onKeyDown={(e) => {
            if (e.key == "Enter") {
                props.handleTask();
            }
        }} 
        
        value={props.currInp}>

        </input>
    );
}

export default Input;