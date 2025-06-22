// entities/Country.ts
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { City } from "./City";

@Entity({ schema: "main", name: "countries" })
export class Country {
  @PrimaryColumn()
  country: string;

  @Column()
  population: number;

  @Column()
  area: number;

  @Column()
  capital_city: string;

  @OneToMany(() => City, city => city.country)
  cities: City[];
}
