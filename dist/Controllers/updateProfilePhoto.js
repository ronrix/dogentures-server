"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePhoto = void 0;
const Profile_1 = require("../entity/Profile");
const typeorm_1 = require("typeorm");
const updateProfilePhoto = async (req, res) => {
    var _a, _b;
    await typeorm_1.getConnection()
        .createQueryBuilder()
        .insert()
        .into(Profile_1.Profile)
        .values([
        {
            name: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name,
            age: req === null || req === void 0 ? void 0 : req.body.age,
            avatar: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path,
        },
    ])
        .execute();
    res.json({ ok: true });
};
exports.updateProfilePhoto = updateProfilePhoto;
//# sourceMappingURL=updateProfilePhoto.js.map