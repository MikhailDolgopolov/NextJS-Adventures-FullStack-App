// src/lib/typeorm/data-source.ts
import 'reflect-metadata';
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
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
//   synchronize: true, // ❗ for dev only
  logging: false,
  entities: [City, Country, Participation, Person, Sight, SightVisit, Souvenir, Trip, TripPoint],
});
