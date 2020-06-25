"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

// eslint-disable-next-line @typescript-eslint/class-name-casing
class alterProviderFieldToProviderID1587425169472 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider',
      type: 'uuid'
    }));
  }

}

exports.default = alterProviderFieldToProviderID1587425169472;