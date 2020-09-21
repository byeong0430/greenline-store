import { Column, Entity } from "typeorm";

@Entity("knex_migrations_lock", { schema: "myhomi" })
export class KnexMigrationsLock {
  @Column("int", { name: "is_locked", nullable: true })
  isLocked: number | null;
}
