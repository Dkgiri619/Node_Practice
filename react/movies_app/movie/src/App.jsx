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
            this.setState({ movies: moviesJson, genre: genreJson });
        }
        f();
    }
    selectFilter = (filter) => {
        this.setState({ selectedFilter: filter });
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

          <div class="col-9 p-4">
            <Search />
            <Table movies={this.state.movies} selectedFilter = {this.state.selectedFilter} />
          </div>
        </div>
      </div>
      );
    }
}

export default App;