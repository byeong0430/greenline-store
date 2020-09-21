import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductLog } from "./ProductLog";

@Index("productLogId", ["productLogId"], {})
@Entity("productLogFields", { schema: "myhomi" })
export class ProductLogFields {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "productLogId" })
  productLogId: string;

  @Column("varchar", { name: "field_name", length: 255 })
  fieldName: string;

  @Column("varchar", { name: "old_value", nullable: true, length: 255 })
  oldValue: string | null;

  @Column("varchar", { name: "new_value", nullable: true, length: 255 })
  newValue: string | null;

  @ManyToOne(() => ProductLog, (productLog) => productLog.productLogFields, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productLogId", referencedColumnName: "id" }])
  productLog: ProductLog;
}
