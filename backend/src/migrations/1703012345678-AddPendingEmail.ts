import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPendingEmail1703012345678 implements MigrationInterface {
    name = 'AddPendingEmail1703012345678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "pendingEmail" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            DROP COLUMN "pendingEmail"
        `);
    }
} 