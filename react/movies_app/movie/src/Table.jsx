import React from "react";
import Pagination from "./Pagination";

class Table extends React.Component {
  render() {
    let selectedFilter = this.props.selectedFilter;
    let moviesArr = this.props.movies;
    let filteredMoviesArr = moviesArr.filter((el) => {
      if (selectedFilter == "All Genre") return true;
      else if (selectedFilter == el.genre.name) return true;
    })
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
                      <td><span class="material-icons-outlined">
                        favorite_border
                      </span></td>
                      <td>
                        <button className="deleteTable">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination />
      </>
    );
  }
}

export default Table;