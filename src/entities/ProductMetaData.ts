import { Column, Entity } from "typeorm";

@Entity("productMetaData", { schema: "myhomi" })
export class ProductMetaData {
  @Column("varchar", { primary: true, name: "productId", length: 255 })
  productId: string;

  @Column("varchar", { primary: true, name: "metaKey", length: 255 })
  metaKey: string;

  @Column("varchar", { name: "metaValue", nullable: true, length: 255 })
  metaValue: string | null;

  @Column("datetime", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("datetime", {
    name: "updateDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date;
}
