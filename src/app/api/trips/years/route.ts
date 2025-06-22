import { getDb } from "@/lib/db";
import { Trip } from "@/lib/typeorm/entities/Trip";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDb();
    const result = await db
      .getRepository(Trip)
      .createQueryBuilder("trip")
      .select("DISTINCT EXTRACT(YEAR FROM trip.start_date)", "year")
      .orderBy("year", "DESC")
      .getRawMany();

    const years = result.map(r => Number(r.year));
    return NextResponse.json(years);
  } catch (err) {
    console.error("Error fetching years with trips:", err);
    return NextResponse.json({ error: "Failed to fetch trip years" }, { status: 500 });
  }
}
