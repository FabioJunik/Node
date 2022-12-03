import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: 'root',
  password: 'postgres2022',
  database: 'acldb',
  migrations: ["src/database/migrations/*ts"],
  entities: ["src/entities/*.ts"],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

export { AppDataSource }