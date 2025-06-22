// entities/Person.ts
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ schema: "main", name: "people" })
export class Person {
  @PrimaryColumn()
  person_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  patronym: string;

  @Column()
  alias: string;

  generalName(): string {
    return this.alias?.trim()
      ? this.alias
      : `${this.last_name} ${this.first_name}`;
  }

  toString(): string {
    return this.generalName();
  }
}
