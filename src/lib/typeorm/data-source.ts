import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { City } from './entities/City';
import { Country } from './entities/Country';
import { Participation } from './entities/Participation';
import { Person } from './entities/Person';
import { Sight } from './entities/Sight';
import { SightVisit } from './entities/SightVisist';
import { Souvenir } from './entities/Souvenir';
import { Trip } from './entities/Trip';
import { TripPoint } from './entities/TripPoint';

export const AppDataSource = new DataSource({
  type: "postgres",  // Explicitly set to postgres
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: [City, Country, Participation, Person, Sight, SightVisit, Souvenir, Trip, TripPoint],
});
