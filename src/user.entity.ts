import { BigIntType, Collection, Entity, Enum, OneToMany, OneToOne, OptionalProps, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { TimestampType } from "./timestamp.type.js";

@Entity()
export class UserEntity {
  @PrimaryKey({ type: 'number', autoincrement: true })
  id: number;

  @Property({ type: TimestampType })
  createdAt: Date = new Date();

  [OptionalProps]: "createdAt";
}
