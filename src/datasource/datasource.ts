import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();


//database connection with typeorm
const databaseConnection = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging:true,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});

export default databaseConnection;