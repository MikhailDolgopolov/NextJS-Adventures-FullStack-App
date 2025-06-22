import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { TripPoint } from "./TripPoint";
import { Person } from "./Person";

@Entity({ schema: "main", name: "trips" })
export class Trip {
  @PrimaryColumn()
  trip_id: number;

  @Column()
  title: string;

  @Column("date")
  start_date: Date;

  @Column("date")
  end_date: Date;

  @Column()
  description: string;

  @Column()
  photo_link: string;

  @Column()
  year: number;

  @OneToMany(() => TripPoint, tp => tp.trip)
  tripPoints: TripPoint[];
  
  @ManyToMany(() => Person, person => person.trips)
  people: Person[];
}