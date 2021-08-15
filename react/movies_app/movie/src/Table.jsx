import React from "react";
import Pagination from "./Pagination";
import  "./Table.css";

class Table extends React.Component {
  state = {
    currPage: 1,
    maxNoMovies: 4
  }
  
  selectTab = (num)=> {
    this.setState({currPage: num});
  }

  render() {
    let selectedFilter = this.props.selectedFilter;
    let moviesArr = this.props.movies;

    let filteredMoviesArr = moviesArr.filter((el) => {
      if (selectedFilter == "All Genre") return true;
      else if (selectedFilter === el.genre.name) return true;
    });

    let total = Math.ceil(filteredMoviesArr.length/4);
    let startIdx = this.state.maxNoMovies*(this.state.currPage-1);
    let endIdx = Math.min((this.state.maxNoMovies*this.state.currPage), this.props.movies.length);
    filteredMoviesArr = filteredMoviesArr.slice(startIdx,endIdx);
    return (
      <>
        <div class="row">
          <div class="col-10">
            <table class="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMoviesArr.map((el) => {
                  return (
                    <tr key={el._id}>
                      <td>{el.title}</td>
                      <td>{el.genre.name}</td>
                      <td>{el.numberInStock}</td>
                      <td>{el.dailyRentalRate}</td>
                      <td onClick = {()=>{
                        this.props.clickedLike(el._id);
                      }}>
                        {
                          el.like?(<span className="material-icons-outlined liked">favorite</span>):(<span className="material-icons-outlined unliked">favorite_border</span>)
                        }
                     </td>
                      <td>
                        <button className="deleteTable" 
                        onClick = {()=>{
                          this.props.deleteTable(el._id);
                        }}
                        >Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination currPage = {this.state.currPage} total = {total} selectTab = {this.selectTab}/>
      </>
    );
  }
}

export default Table;