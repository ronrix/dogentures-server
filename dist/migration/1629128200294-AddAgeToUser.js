"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAgeToUser1629128200294 = void 0;
class AddAgeToUser1629128200294 {
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `users` ADD `age` int");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `age`");
    }
}
exports.AddAgeToUser1629128200294 = AddAgeToUser1629128200294;
//# sourceMappingURL=1629128200294-AddAgeToUser.js.map