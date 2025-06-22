import type { Relation } from "typeorm";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { City } from "./City";

@Entity({ schema: "main", name: "countries" })
export class Country {
  @PrimaryColumn()
  country: string;

  @Column({type:"numeric", nullable: true })
  population: number;

  @Column({type:"numeric", nullable: true })
  area: number;

  @Column({type:"text", nullable: true })
  capital_city: string;

  @OneToMany(() => City, city => city.country)
  cities: Relation<City[]>;
}
