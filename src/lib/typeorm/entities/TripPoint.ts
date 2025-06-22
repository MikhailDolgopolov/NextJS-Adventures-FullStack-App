import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "trippoints" })
export class TripPoint {
  @PrimaryColumn()
  trippoint_id: number;

  @Column()
  title: string;

  @Column()
  trip_id: number;

  @Column({ nullable: true })
  city: string | null;

  @Column()
  trip_order: number;
}