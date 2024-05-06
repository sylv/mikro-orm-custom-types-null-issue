import { Type } from "@mikro-orm/postgresql";

type JSType = Date | number | undefined;
type DBType = string | number | undefined;

export class TimestampType extends Type<JSType, DBType> {
  compareAsType(): string {
    return "string";
  }

  convertToDatabaseValue(value: JSType) {
    if (!value) return value;
    if (typeof value === "number") return value;
    if (value instanceof Date) return value.getTime();
    throw new Error(`Cannot serialize "${value}" to a timestamp.`);
  }

  convertToJSValue(value: DBType): Date | undefined {
    if (value == null) return value;
    return new Date(Number(value));
  }

  getColumnType() {
    return "bigint";
  }
}
