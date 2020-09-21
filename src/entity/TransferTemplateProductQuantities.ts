import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Products } from "./Products";
import { Locations } from "./Locations";
import { TransferTemplates } from "./TransferTemplates";

@Index("locationId", ["locationId"], {})
@Index("transferTemplateId", ["transferTemplateId"], {})
@Entity("transferTemplateProductQuantities", { schema: "myhomi" })
export class TransferTemplateProductQuantities {
  @Column("varchar", { primary: true, name: "productId", length: 255 })
  productId: string;

  @Column("mediumint", { primary: true, name: "locationId" })
  locationId: number;

  @Column("decimal", { name: "quantity", precision: 20, scale: 4 })
  quantity: string;

  @Column("mediumint", { primary: true, name: "transferTemplateId" })
  transferTemplateId: number;

  @Column("int", { name: "indexOrder" })
  indexOrder: number;

  @ManyToOne(
    () => Products,
    (products) => products.transferTemplateProductQuantities,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(
    () => Locations,
    (locations) => locations.transferTemplateProductQuantities,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;

  @ManyToOne(
    () => TransferTemplates,
    (transferTemplates) => transferTemplates.transferTemplateProductQuantities,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "transferTemplateId", referencedColumnName: "id" }])
  transferTemplate: TransferTemplates;
}
