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
exports.DeletePost = void 0;
const isAuth_1 = require("../isAuth");
const Profile_1 = require("../entity/Profile");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entity/Post");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let DeletePost = class DeletePost {
    constructor() {
        this.profileEntity = typeorm_1.getRepository(Profile_1.Profile);
        this.postsEntity = typeorm_1.getRepository(Post_1.Posts);
    }
    async deletePost(id) {
        try {
            await this.postsEntity.delete({ id: new mongodb_1.ObjectId(id) });
        }
        catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID]),
    __metadata("design:returntype", Promise)
], DeletePost.prototype, "deletePost", null);
DeletePost = __decorate([
    type_graphql_1.Resolver()
], DeletePost);
exports.DeletePost = DeletePost;
//# sourceMappingURL=DeletePost.js.map