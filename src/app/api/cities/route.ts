// src/app/api/cities/route.ts
import { NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/typeorm/data-source';
import { City } from '@/lib/typeorm/entities/City';

export async function GET() {
  const db = await AppDataSource.initialize();
  const cities = await db.getRepository(City).find();
  await db.destroy();
  return NextResponse.json(cities);
}
export async function POST(request: Request) {
  const db = await AppDataSource.initialize();
  const cityData = await request.json();
  const city = db.getRepository(City).create(cityData);
  const savedCity = await db.getRepository(City).save(city);
  await db.destroy();
  return NextResponse.json(savedCity);
}