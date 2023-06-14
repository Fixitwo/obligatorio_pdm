import * as SQLite from 'expo-sqlite';
const DBNAME = 'database.db';


const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase(DBNAME),
    closeConnection: () => SQLite.Close(DBNAME),       
}

export default DatabaseConnection;