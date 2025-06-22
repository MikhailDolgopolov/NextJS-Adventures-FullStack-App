// entities/Participation.ts
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "participation" })
export class Participation {
  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  trip_id: number;
}
