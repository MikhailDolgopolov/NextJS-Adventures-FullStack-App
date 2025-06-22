import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "sights" })
export class Sight {
  @PrimaryColumn()
  sight_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  city: string | null;

  @Column()
  type: string;

  @Column()
  created_year: number;

  @Column()
  description: string;

  @Column()
  image_link: string;
}
