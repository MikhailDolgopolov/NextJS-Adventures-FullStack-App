import { Entity, Column, PrimaryColumn } from "typeorm";

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
}