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

  @OneToMany(() => SightVisit, visit => visit.sight)
  sightVisits: SightVisit[];
}
