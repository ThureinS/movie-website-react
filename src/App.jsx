import Header from "./components/Header.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import MovieList from "./components/MovieList.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useTrendingMovies } from "./hooks/useTrendingMovies.js";

function App() {
  const { searchText, setSearchText, movieList, isLoading, errorMessage } =
    useMovies();
  const {
    trendingMovies,
    isLoading: isTrendingLoading,
    errorMessage: trendingErrorMessage,
  } = useTrendingMovies();

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <Header searchText={searchText} setSearchText={setSearchText} />
        <TrendingMovies
          trendingMovies={trendingMovies}
          isLoading={isTrendingLoading}
          errorMessage={trendingErrorMessage}
        />
        <MovieList
          movieList={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </main>
  );
}

export default App;
