import type { Relation } from 'typeorm';
import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, } from "typeorm";
import { Trip } from "./Trip";

@Entity({ schema: "main", name: "people" })
export class Person {
  @PrimaryColumn()
  person_id: number;

  @Column()
  first_name: string;

  @Column({type:"text", nullable: true })
  last_name: string;

  @Column({type:"text", nullable: true })
  patronym: string;

  @Column({type:"text", nullable: true })
  alias: string;

  generalName(): string {
    return this.alias?.trim()
      ? this.alias
      : `${this.last_name} ${this.first_name}`;
  }

  toString(): string {
    return this.generalName();
  }
  @ManyToMany(() => Trip, trip => trip.people)
  @JoinTable({
    name: "participation",
    joinColumn: { name: "person_id", referencedColumnName: "person_id" },
    inverseJoinColumn: { name: "trip_id", referencedColumnName: "trip_id" },
  })
  trips: Relation<Trip[]>;
}
