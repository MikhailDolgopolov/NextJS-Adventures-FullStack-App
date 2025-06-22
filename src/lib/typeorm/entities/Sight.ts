import type { Relation } from "typeorm";
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { SightVisit } from "./SightVisist";

@Entity({ schema: "main", name: "sights" })
export class Sight {
  @PrimaryColumn()
  sight_id: number;

  @Column()
  name: string;
  
  @ManyToOne(() => City, c => c.sights)
  @JoinColumn({ name: 'city', referencedColumnName: 'city' })
  @Column({type:"text", nullable: true })
  city: Relation<string | null>;

  @Column()
  type: string;

  @Column({type:"numeric", nullable: true })
  created_year: number;

  @Column({type:"text", nullable: true })
  description: string;

  @Column({type:"text", nullable: true })
  image_link: string;

  @OneToMany(() => SightVisit, visit => visit.sight)
  sightVisits: Relation<SightVisit[]>;
}
