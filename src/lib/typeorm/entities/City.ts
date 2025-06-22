// entities/City.ts
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { TripPoint } from "./TripPoint";
import { Sight } from "./Sight";
import { Souvenir } from "./Souvenir";

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

  @OneToMany(() => TripPoint, tripPoint => tripPoint.city)
  tripPoints: TripPoint[];

  @OneToMany(() => Sight, sight => sight.city)
  sights: Sight[];

  @OneToMany(() => Souvenir, souvenir => souvenir.city) 
  souvenirs: Souvenir[];

  toString() {
    return `${this.city}, ${this.country}`;
  }
}
