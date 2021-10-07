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
exports.GetInfo = void 0;
const type_graphql_1 = require("type-graphql");
const Profile_1 = require("../entity/Profile");
const Post_1 = require("../entity/Post");
const isAuth_1 = require("../isAuth");
const typeorm_1 = require("typeorm");
let GetInfoRes = class GetInfoRes {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetInfoRes.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetInfoRes.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], GetInfoRes.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetInfoRes.prototype, "error", void 0);
GetInfoRes = __decorate([
    type_graphql_1.ObjectType()
], GetInfoRes);
let GetInfo = class GetInfo {
    constructor() {
        this.profileEntity = typeorm_1.getMongoRepository(Profile_1.Profile);
    }
    async getInfo({ payload }) {
        var _a, _b, _c;
        try {
            const users = await Profile_1.Profile.find();
            const user = users.filter(user => String(user.id) === String(payload === null || payload === void 0 ? void 0 : payload.userId));
            const post = await Post_1.Posts.find({ where: { userId: (_a = user[0]) === null || _a === void 0 ? void 0 : _a.id } });
            return {
                avatar: (_b = user[0]) === null || _b === void 0 ? void 0 : _b.avatar,
                name: (_c = user[0]) === null || _c === void 0 ? void 0 : _c.name,
                posts: post === null || post === void 0 ? void 0 : post.length,
            };
        }
        catch (e) {
            console.log(e);
            return { error: e };
        }
    }
    async getUserInfoById(userId) {
        const users = await this.profileEntity.find();
        const user = users.filter((user) => String(user.id) === String(userId));
        return {
            avatar: user[0].avatar,
            name: user[0].name,
        };
    }
    async getAllUsers() {
        return await this.profileEntity.find();
    }
};
__decorate([
    type_graphql_1.Query(() => GetInfoRes),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetInfo.prototype, "getInfo", null);
__decorate([
    type_graphql_1.Query(() => GetInfoRes),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('userId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID]),
    __metadata("design:returntype", Promise)
], GetInfo.prototype, "getUserInfoById", null);
__decorate([
    type_graphql_1.Query(() => [GetInfoRes]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetInfo.prototype, "getAllUsers", null);
GetInfo = __decorate([
    type_graphql_1.Resolver()
], GetInfo);
exports.GetInfo = GetInfo;
//# sourceMappingURL=GetInfo.js.map