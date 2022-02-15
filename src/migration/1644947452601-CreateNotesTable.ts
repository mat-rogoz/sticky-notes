import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotesTable1644947452601 implements MigrationInterface {
  name = 'CreateNotesTable1644947452601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "notes" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "tittle" varchar NOT NULL,
        "message" varchar NOT NULL,
        "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
        "updatedAt" datetime DEFAULT (datetime('now'))
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "notes"
    `);
  }
}
