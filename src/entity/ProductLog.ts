import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Products } from "./Products";
import { ProductLogFields } from "./ProductLogFields";

@Index("employeeId", ["employeeId"], {})
@Index("productId", ["productId"], {})
@Entity("productLog", { schema: "myhomi" })
export class ProductLog {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "productId", length: 255 })
  productId: string;

  @Column("varchar", { name: "employeeId", length: 255 })
  employeeId: string;

  @Column("varchar", { name: "event", length: 255 })
  event: string;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @ManyToOne(() => Users, (users) => users.productLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Users;

  @ManyToOne(() => Products, (products) => products.productLogs, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @OneToMany(
    () => ProductLogFields,
    (productLogFields) => productLogFields.productLog
  )
  productLogFields: ProductLogFields[];
}
