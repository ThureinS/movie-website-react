import { Client, TablesDB, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_KEY;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_KEY;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // use the exact region host from Console
  .setProject(PROJECT_ID);

const tables = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", searchTerm)],
    });

    if (result.rows.length) {
      const row = result.rows[0];

      // Prefer atomic bump to avoid race conditions
      await tables.incrementRowColumn({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: row.$id,
        column: "count",
        value: 1,
      });

      // (If incrementRowColumn isn’t available in your SDK, fallback to:)
      // await tables.updateRow({
      //   databaseId: DATABASE_ID,
      //   tableId: TABLE_ID,
      //   rowId: row.$id,
      //   data: { count: row.count + 1 },
      // });
    } else {
      // First row for this searchTerm
      await tables.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error("updateSearchCount error:", error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    return result.rows;
  } catch (error) {
    console.log(error);
  }
};
