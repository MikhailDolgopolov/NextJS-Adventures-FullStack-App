import { AppDataSource } from "./typeorm/data-source";


export async function getDb() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
