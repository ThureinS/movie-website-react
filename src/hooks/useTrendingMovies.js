import { useState, useEffect } from "react";
import { getTrendingMovies } from "../appwrite";

export const useTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadTrendingMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies : " + error);
        setErrorMessage(
          "Could not load trending movies. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  return { trendingMovies, isLoading, errorMessage };
};
