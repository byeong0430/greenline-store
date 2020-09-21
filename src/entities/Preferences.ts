import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPreferences } from "./UserPreferences";

@Entity("preferences", { schema: "myhomi" })
export class Preferences {
  @PrimaryGeneratedColumn({ type: "mediumint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "userType", length: 20 })
  userType: string;

  @Column("tinyint", { name: "defaultBoolean", nullable: true, width: 1 })
  defaultBoolean: boolean | null;

  @Column("mediumtext", { name: "defaultString", nullable: true })
  defaultString: string | null;

  @OneToMany(
    () => UserPreferences,
    (userPreferences) => userPreferences.preference
  )
  userPreferences: UserPreferences[];
}
