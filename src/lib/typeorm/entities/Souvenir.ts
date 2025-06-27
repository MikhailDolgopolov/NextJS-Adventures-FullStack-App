import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "souvenirs" })
export class Souvenir {
  @PrimaryColumn()
  souvenir_id: number;

  @Column()
  name: string;

  @Column()
  trip_point_id: number;

  @Column({type:"text", nullable: true })
  city: string | null;

  @Column({type:"text", nullable: true })
  type: string | null;

  @Column({type:"text", nullable: true })
  material: string | null;

  @Column({type:"text", nullable: true })
  description: string | null;
}