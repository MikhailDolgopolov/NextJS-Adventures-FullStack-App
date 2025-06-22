import { getDb } from "@/lib/db";
import { Country } from "@/lib/typeorm/entities/Country";
import { City } from "@/lib/typeorm/entities/City";
import { Sight } from "@/lib/typeorm/entities/Sight";
import { Souvenir } from "@/lib/typeorm/entities/Souvenir";
import { Trip } from "@/lib/typeorm/entities/Trip";
import CountryPageClient from "./CountryPageClient";
import { notFound } from "next/navigation";

type Params = { country: string };

export default async function CountryPage({ params }: { params: Params }) {
  const db = await getDb();
  const countryObj = await db.getRepository(Country).findOneBy({ country: params.country });
  if (!countryObj) {
    return notFound();
  }
 const country = params.country;

  // Define query functions cleanly
  const fetchCities = db.getRepository(City).find({ where: { country } });

  const fetchSights = db
    .getRepository(Sight)
    .createQueryBuilder('sight')
    .innerJoin('sight.city', 'city')
    .where('city.country = :country', { country })
    .getMany();

  const fetchSouvenirs = db
    .getRepository(Souvenir)
    .createQueryBuilder('souvenir')
    .innerJoin('souvenir.city', 'city')
    .where('city.country = :country', { country })
    .getMany();

  const fetchTrips = db
    .getRepository(Trip)
    .createQueryBuilder('trip')
    .innerJoin('trip.tripPoints', 'tp')
    .innerJoin('tp.city', 'city')
    .where('city.country = :country', { country })
    .getMany();

  // Run them in parallel
  const [cities, sights, souvenirs, trips] = await Promise.all([
    fetchCities,
    fetchSights,
    fetchSouvenirs,
    fetchTrips,
  ]);


  return (
    <CountryPageClient
      country={countryObj}
      cities={cities}
      sights={sights}
      souvenirs={souvenirs}
      trips={trips}
    />
  );
}
