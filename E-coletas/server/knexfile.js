import path from "path";

const config = {
  client: "sqlite3",
  connection: {
    filename: path.resolve("src/database/database.sqlite"),
  },
  migrations: {
    directory: path.resolve("src/database/migrations"),
  },
  seeds: {
    directory: path.resolve("src/database/seeds"),
  },
  useNullAsDefault: true,
};

export default config;
