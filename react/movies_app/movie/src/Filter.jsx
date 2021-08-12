let Filter = (props) => {
    console.log("this log is from filter");
    console.log(props.genreData);
  return (
    <div class="col-3">
      <ul class="list-group m-4">
        <li class={`list-group-item ${props.selectedFilter=="All Genre"?"active":""}`} onClick={
          ()=>{
            props.selectFilter("All Genre");
          }
        }>All Genre</li>
        {
            props.genreData.map((el)=>{
                return  <li key={el._id} 
                class={`list-group-item ${props.selectedFilter==el.name?"active":""}`}
                onClick={
                  ()=>{
                    props.selectFilter(el.name);
                  }
                }>{el.name}</li>
            })
        }
      </ul>
    </div>
  );
};

export default Filter;