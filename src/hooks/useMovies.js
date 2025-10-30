import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { updateSearchCount } from "../appwrite";

export const useMovies = () => {
  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  useDebounce(() => setDebounceSearchTerm(searchText), 500, [searchText]);

  useEffect(() => {
    const fetchMovies = async (query = "") => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(
          `/.netlify/functions/fetch-movies?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();

        if (data.results && data.results.length === 0) {
          setErrorMessage("No movies found for your search.");
          setMovieList([]);
        } else if (data.results) {
          setMovieList(data.results);
        } else {
          setErrorMessage(data.Error || "An unknown error occurred.");
          setMovieList([]);
        }

        if (query && data.results && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching movies : " + error);
        setErrorMessage(
          "There was a problem connecting to the movie database. Please check your network connection and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return { searchText, setSearchText, movieList, isLoading, errorMessage };
};
