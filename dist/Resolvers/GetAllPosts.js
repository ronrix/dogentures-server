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
exports.GetAllPosts = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entity/Post");
const GetAllPostsType_1 = require("../ObjecTypes/GetAllPostsType");
const isAuth_1 = require("../isAuth");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let GetAllPosts = class GetAllPosts {
    constructor() {
        this.postsEntity = typeorm_1.getMongoRepository(Post_1.Posts);
    }
    async getAllPosts() {
        return await this.postsEntity.find();
    }
    async getAllPostsByUserId({ payload }) {
        return await this.postsEntity.find({ userId: new mongodb_1.ObjectId(payload === null || payload === void 0 ? void 0 : payload.userId) });
    }
};
__decorate([
    type_graphql_1.Query(() => [GetAllPostsType_1.GetAllPostsType]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetAllPosts.prototype, "getAllPosts", null);
__decorate([
    type_graphql_1.Query(() => [GetAllPostsType_1.GetAllPostsType]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetAllPosts.prototype, "getAllPostsByUserId", null);
GetAllPosts = __decorate([
    type_graphql_1.Resolver()
], GetAllPosts);
exports.GetAllPosts = GetAllPosts;
//# sourceMappingURL=GetAllPosts.js.map