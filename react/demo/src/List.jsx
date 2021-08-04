let List = (props) => {
    return (
        <ul>
        {
            props.tasks.map((el) => {
                return <li>{el}</li>;
            })
        }
    </ul>
    );
}
export default List;