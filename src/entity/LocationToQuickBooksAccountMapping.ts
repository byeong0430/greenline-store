import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Locations } from "./Locations";

@Entity("locationToQuickBooksAccountMapping", { schema: "myhomi" })
export class LocationToQuickBooksAccountMapping {
  @Column("mediumint", { primary: true, name: "locationId" })
  locationId: number;

  @Column("varchar", { name: "classId", nullable: true, length: 255 })
  classId: string | null;

  @OneToOne(
    () => Locations,
    (locations) => locations.locationToQuickBooksAccountMapping,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "locationId", referencedColumnName: "id" }])
  location: Locations;
}
