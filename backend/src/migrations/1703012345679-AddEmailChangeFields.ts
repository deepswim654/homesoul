import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailChangeFields1703012345679 implements MigrationInterface {
    name = 'AddEmailChangeFields1703012345679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "emailChangeToken" character varying,
            ADD COLUMN "emailChangeTokenExpiry" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            DROP COLUMN "emailChangeToken",
            DROP COLUMN "emailChangeTokenExpiry"
        `);
    }
} 