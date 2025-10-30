export const updateSearchCount = async (searchTerm, movie) => {
  try {
    await fetch("/.netlify/functions/update-search-count", {
      method: "POST",
      body: JSON.stringify({ searchTerm, movie }),
    });
  } catch (error) {
    console.error("updateSearchCount error:", error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await fetch("/.netlify/functions/get-trending-movies");
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.log(error);
  }
};
