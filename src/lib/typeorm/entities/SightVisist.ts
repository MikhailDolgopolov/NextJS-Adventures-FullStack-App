import type { Relation } from "typeorm";
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Sight } from "./Sight";
import { TripPoint } from "./TripPoint";

@Entity({ schema: "main", name: "visited_sights" })
export class SightVisit {
  @PrimaryColumn()
  trippoint_id: number;

  @PrimaryColumn()
  sight_id: number;

  @Column("date")
  visited_date: Date;
  
  @ManyToOne(() => TripPoint, tp => tp.sightVisits)
  @JoinColumn({ name: "trippoint_id" })
  trippoint: Relation<TripPoint>;

  @ManyToOne(() => Sight, sight => sight.sightVisits)
  @JoinColumn({ name: "sight_id" })
  sight: Relation<Sight>;
}