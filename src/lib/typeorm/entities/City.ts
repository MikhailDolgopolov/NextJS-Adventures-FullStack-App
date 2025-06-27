import type { Relation } from "typeorm";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { TripPoint } from "./TripPoint";
import { Sight } from "./Sight";
import { Souvenir } from "./Souvenir";

@Entity({ schema: "main", name: "cities" })
export class City {
  @PrimaryColumn()
  city: string;

  @Column()
  country: string;

  @Column({type:"numeric", nullable: true })
  population: number;

  @Column({type:"numeric", nullable: true })
  founded_year: number;

  @OneToMany(() => TripPoint, tripPoint => tripPoint.city)
  tripPoints: Relation<TripPoint[]>;

  @OneToMany(() => Sight, sight => sight.city)
  sights: Relation<Sight[]>;

  @OneToMany(() => Souvenir, souvenir => souvenir.city) 
  souvenirs: Relation<Souvenir[]>;

  toString() {
    return `${this.city}, ${this.country}`;
  }
}
