import PropTypes from "prop-types";
import MovieCard from "./MovieCard.jsx";
import Spinner from "./Spinner.jsx";
import Error from "./Error.jsx";

const MovieList = ({ movieList, isLoading, errorMessage }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <section className="all-movies">
      <h2>All Movies</h2>
      <ul>
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </section>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default MovieList;
