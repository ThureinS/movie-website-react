import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Error from "./Error";

const TrendingMovies = ({ trendingMovies, isLoading, errorMessage }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  if (trendingMovies.length === 0) {
    return null;
  }

  return (
    <section className="trending">
      <h2>Trending Movies</h2>

      <ul>
        {trendingMovies.map((movie, index) => (
          <li key={movie.$id}>
            <p>{index + 1}</p>
            <img src={movie.poster_url} alt={movie.title} />
          </li>
        ))}
      </ul>
    </section>
  );
};

TrendingMovies.propTypes = {
  trendingMovies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default TrendingMovies;
