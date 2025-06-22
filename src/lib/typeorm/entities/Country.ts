// entities/Country.ts
import { Entity, Column, PrimaryColumn } from "typeorm";

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
}
