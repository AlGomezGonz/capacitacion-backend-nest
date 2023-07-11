import { MigrationInterface, QueryRunner } from 'typeorm';

export class Create1688968219686 implements MigrationInterface {
  name = 'Create1688968219686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "human" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "nickname" character varying NOT NULL, "age" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fa2d597665c4d7604049d5f7792" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "humanId" integer, CONSTRAINT "REL_ff83016b566db10dda92243472" UNIQUE ("humanId"), CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_ff83016b566db10dda922434728" FOREIGN KEY ("humanId") REFERENCES "human"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet" DROP CONSTRAINT "FK_ff83016b566db10dda922434728"`,
    );
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`DROP TABLE "human"`);
  }
}
