import * as SQLite from 'expo-sqlite';
const DBNAME = 'database.db';

const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase(DBNAME),
    closeConnection: () => SQLite.closeDatabase(DBNAME),
    // a modo de ejemplo
    inserUser: (userName, password, email) => {
        const db = getConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO users (userName, password, email) VALUES (?, ?, ?)',
                [userName, password, email],
                (tx, results) => {
                    if(results.rowsAffected > 0){
                        return results.rowsAffected;
                    }
                    return 0;
                }
            )
        });
    },    
    inserZone: (site, departament, workers,latitude,longitude) => {
        const db = getConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO sites (site, departament, workers, latitude, longitude) VALUES (?, ?, ?)',
                [site, departament, workers, latitude, longitude],
                (tx, results) => {
                    if(results.rowsAffected > 0){
                        return results.rowsAffected;
                    }
                    return 0;
                }
            )
        });
    }    
}

export default DatabaseConnection;