import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("webhookQueues", { schema: "myhomi" })
export class WebhookQueues {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "baseUrl", length: 255 })
  baseUrl: string;

  @Column("varchar", { name: "httpVerb", length: 10 })
  httpVerb: string;

  @Column("mediumtext", { name: "connectionConfig", nullable: true })
  connectionConfig: string | null;

  @Column("varchar", { name: "url", length: 255 })
  url: string;

  @Column("longtext", { name: "data" })
  data: string;

  @Column("int", { name: "attempts", default: () => "'0'" })
  attempts: number;

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

  @Column("mediumtext", { name: "errorResponse", nullable: true })
  errorResponse: string | null;
}
