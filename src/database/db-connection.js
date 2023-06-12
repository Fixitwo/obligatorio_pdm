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

    inserZona: (lugar, departamento, trabajador, longitud, latitud) => {
        const db = getConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO zonas (lugar, departamento, trabajador, longitud, latitud) VALUES (?, ?, ?)',
                [lugar, departamento, trabajador, longitud, latitud],
                (tx, results) => {
                    if(results.rowsAffected > 0){
                        return results.rowsAffected;
                    }
                    return 0;
                }
            )
        });
    },    
       
}

export default DatabaseConnection;