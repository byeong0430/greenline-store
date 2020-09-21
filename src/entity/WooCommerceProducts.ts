import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Companies } from "./Companies";
import { Products } from "./Products";

@Index("productId", ["productId"], {})
@Entity("wooCommerceProducts", { schema: "myhomi" })
export class WooCommerceProducts {
  @Column("mediumint", { primary: true, name: "companyId" })
  companyId: number;

  @Column("varchar", { primary: true, name: "productId", length: 255 })
  productId: string;

  @Column("timestamp", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("timestamp", { name: "updateDate", nullable: true })
  updateDate: Date | null;

  @Column("int", { name: "wooCommerceProductId", nullable: true })
  wooCommerceProductId: number | null;

  @Column("mediumtext", { name: "wooCommerceProductJSON", nullable: true })
  wooCommerceProductJson: string | null;

  @ManyToOne(() => Companies, (companies) => companies.wooCommerceProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;

  @ManyToOne(() => Products, (products) => products.wooCommerceProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
