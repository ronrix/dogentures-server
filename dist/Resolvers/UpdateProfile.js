"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const Profile_1 = require("../entity/Profile");
let UpdateProfile = class UpdateProfile {
    async updateProfile(id, { createReadStream, filename }, name, bdate) {
        try {
            await new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(fs_1.createWriteStream(path_1.join(__dirname, `../images/profile/${filename}`)))
                    .on('finish', async () => {
                    await Profile_1.Profile.update({ id }, { avatar: filename, name, bdate });
                    resolve(true);
                })
                    .on('error', () => reject(false));
            });
        }
        catch (err) {
            return false;
        }
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload)),
    __param(2, type_graphql_1.Arg("name", () => String)),
    __param(3, type_graphql_1.Arg('bdate', () => Date)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, String, Date]),
    __metadata("design:returntype", Promise)
], UpdateProfile.prototype, "updateProfile", null);
UpdateProfile = __decorate([
    type_graphql_1.Resolver()
], UpdateProfile);
exports.UpdateProfile = UpdateProfile;
//# sourceMappingURL=UpdateProfile.js.map