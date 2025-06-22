import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "souvenirs" })
export class Souvenir {
  @PrimaryColumn()
  souvenir_id: number;

  @Column()
  name: string;

  @Column()
  trippoint_id: number;

  @Column({ nullable: true })
  city: string | null;

  @Column({ nullable: true })
  type: string | null;

  @Column({ nullable: true })
  material: string | null;

  @Column()
  description: string;
}