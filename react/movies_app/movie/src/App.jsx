import React from "react";
import Filter from "./Filter";
import Navbar from "./Navbar";
import Search from "./Search";
import Table from "./Table";
class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre"
  }
  componentDidMount() {
    let f = async () => {
      let moviesJ = await fetch("/movies");
      let genreJ = await fetch("/genre");
      let moviesJson = await moviesJ.json();
      let genreJson = await genreJ.json();
      this.setState({ movies: moviesJson, like: false, genre: genreJson });
    }
    f();
  }
  clickedLike = (id) => {
    // console.log("liked");
    let index = this.state.movies.findIndex((el) => {
      return el._id === id;
    });
    let currMoviesArr = this.state.movies.map((el) => el);
    if (currMoviesArr[index].like) {
      currMoviesArr[index].like = false;
    } else {
      currMoviesArr[index].like = true;
    }
    this.setState({ movies: currMoviesArr });
  }

  selectFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  }


  deleteTable = (id) => {
    let filteredArr = this.state.movies.filter((el) => {
      return el._id !== id;
    });

    this.setState({ movies: filteredArr });
  }

  render = () => {
    return (
      <div>
        <Navbar />

        <div className="row">
          <Filter
            selectFilter={this.selectFilter}
            selectedFilter={this.state.selectedFilter}
            genreData={this.state.genre}
          />

          <div className="col-9 p-4">
            <Search />
            <Table
             movies={this.state.movies} 
             selectedFilter={this.state.selectedFilter} 
             clickedLike = {this.clickedLike} 
             deleteTable = {this.deleteTable}
             />
          </div>
        </div>
      </div>
    );
  }
}

export default App;