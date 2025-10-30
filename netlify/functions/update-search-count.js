const { Client, Databases, ID, Query } = require("appwrite");

const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.VITE_APPWRITE_DB_KEY;
const TABLE_ID = process.env.VITE_APPWRITE_TABLE_KEY;
const END_POINT = process.env.VITE_APPWRITE_ENDPOINT;
const API_KEY = process.env.VITE_APPWRITE_API_KEY;

const client = new Client()
  .setEndpoint(END_POINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

exports.handler = async (event, context) => {
  const { searchTerm, movie } = JSON.parse(event.body);

  try {
    const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length) {
      const document = result.documents[0];
      await databases.updateDocument(DATABASE_ID, TABLE_ID, document.$id, {
        count: document.count + 1,
      });
    } else {
      await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
