import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("knex_migrations", { schema: "myhomi" })
export class KnexMigrations {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "batch", nullable: true })
  batch: number | null;

  @Column("timestamp", { name: "migration_time", nullable: true })
  migrationTime: Date | null;
}
