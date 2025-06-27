import type { Relation } from "typeorm";
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { Trip } from "./Trip";
import { SightVisit } from "./SightVisist";

@Entity({ schema: "main", name: "trip_points" })
export class TripPoint {
  @PrimaryColumn()
  trip_point_id: number;

  @Column()
  title: string;

  @Column()
  trip_order: number;

  @ManyToOne(() => Trip, trip => trip.tripPoints)
  @JoinColumn({ name: 'trip_id' })
  trip: Relation<Trip>;

  @ManyToOne(() => City, city => city.tripPoints, { nullable: true })
  @JoinColumn({ name: 'city', referencedColumnName: 'city' })
  city: Relation<City | null>;

  @OneToMany(() => SightVisit, visit => visit.trip_point)
  sightVisits: Relation<SightVisit[]>;

}