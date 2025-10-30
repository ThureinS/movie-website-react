const { Client, Databases, Query } = require("appwrite");

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
  try {
    const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify(result.documents),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
