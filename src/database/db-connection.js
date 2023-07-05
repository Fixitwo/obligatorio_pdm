import * as SQLite from 'expo-sqlite';
const DBNAME = 'database.db';


const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase(DBNAME),
    closeConnection: () => SQLite.Close(DBNAME), 
    
    inserUsuario: (nombre, apellido, cedula) => {
        const db = getConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO usuarios (nombre, apellido, cedula) VALUES (?, ?, ?)',
                [nombre, apellido, cedula],
                (tx, results) => {
                    if(results.rowsAffected > 0){
                        return results.rowsAffected;
                    }
                    return 0;
                }
            )
        });
    },   
    
    insertZona: (lugar, departamento, numTrabajadores, longitud, latitud) => {
        const db = getConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO zonas (lugar, departamento, numTrabajadores, longitud, latitud) VALUES (?, ?, ?, ?, ?)',
                [lugar, departamento, numTrabajadores, longitud, latitud],
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