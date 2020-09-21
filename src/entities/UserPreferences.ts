import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Preferences } from "./Preferences";
import { Users } from "./Users";

@Index("preferenceId", ["preferenceId"], {})
@Index("userId", ["userId"], {})
@Entity("userPreferences", { schema: "myhomi" })
export class UserPreferences {
  @Column("mediumint", { name: "preferenceId" })
  preferenceId: number;

  @Column("varchar", { name: "userId", length: 100 })
  userId: string;

  @Column("tinyint", { name: "booleanValue", nullable: true, width: 1 })
  booleanValue: boolean | null;

  @Column("mediumtext", { name: "stringValue", nullable: true })
  stringValue: string | null;

  @ManyToOne(() => Preferences, (preferences) => preferences.userPreferences, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "preferenceId", referencedColumnName: "id" }])
  preference: Preferences;

  @ManyToOne(() => Users, (users) => users.userPreferences, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
