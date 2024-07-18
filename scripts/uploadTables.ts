import { mysql_connection } from '../config/mysql';
import mysql from 'mysql2/promise';
import fs from 'fs';

const script_path = process.argv[2];

async function upload(path: string) {
  const connection = await mysql.createConnection(mysql_connection);
  try {
    const sqlScript = fs.readFileSync(path, 'utf8');
    const sqlCommands = sqlScript.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
    for (const command of sqlCommands) {
      await connection.query(command);
    }
    
    console.log('Sql script executed successfully.');
  } 
  catch (error) {
    console.error('Error executing sql script:', error);
  } 
  finally {
    await connection.end();
  }
}

upload(script_path);