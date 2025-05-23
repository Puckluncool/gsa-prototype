import BaseMigration from "@src/core/domains/migrations/base/BaseMigration";
import { App } from "@src/core/services/App";
import { DataTypes } from "sequelize";

class TestMigration extends BaseMigration {

    group?: string = 'testing';

    async up(): Promise<void> {
        await App.container('db').schema().createTable('tests', {
            name: DataTypes.STRING,
            age: DataTypes.INTEGER
        })
    }

    async down(): Promise<void> {
        await App.container('db').schema().dropTable('tests')
    }

}

export default TestMigration