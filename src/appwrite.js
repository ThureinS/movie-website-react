const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_KEY;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_KEY;

export const updateSearchCount = () => {
  console.log(PROJECT_ID, DATABASE_ID, TABLE_ID);
};
