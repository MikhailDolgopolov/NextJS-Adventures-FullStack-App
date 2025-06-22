import type { Relation } from "typeorm";
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

  @Column("date", { nullable: true })
  end_date: Date;

  @Column({type:"text", nullable: true })
  description: string | null;

  @Column({type:"text", nullable: true })
  photo_link: string | null;

  @OneToMany(() => TripPoint, tp => tp.trip)
  tripPoints: Relation<TripPoint[]>;
  
  @ManyToMany(() => Person, person => person.trips)
  people: Relation<Person[]>;
}