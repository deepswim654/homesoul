import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordSecurityFields1703012345680 implements MigrationInterface {
    name = 'AddPasswordSecurityFields1703012345680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "passwordHistory" text[] DEFAULT '{}',
            ADD COLUMN "failedPasswordAttempts" integer DEFAULT 0,
            ADD COLUMN "lastFailedAttempt" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" 
            DROP COLUMN "passwordHistory",
            DROP COLUMN "failedPasswordAttempts",
            DROP COLUMN "lastFailedAttempt"
        `);
    }
} 