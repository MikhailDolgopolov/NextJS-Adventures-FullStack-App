// entities/City.ts
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "Cities" })
export class City {
  @PrimaryColumn()
  city: string;

  @Column()
  country: string;

  @Column()
  population: number;

  @Column()
  founded_year: number;

  toString() {
    return `${this.city}, ${this.country}`;
  }
}
