import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ schema: "main", name: "visited_sights" })
export class SightVisit {
  @PrimaryColumn()
  trippoint_id: number;

  @PrimaryColumn()
  sight_id: number;

  @Column("date")
  visited_date: Date;
}