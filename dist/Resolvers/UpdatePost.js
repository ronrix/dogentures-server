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
exports.UpdatePost = void 0;
const Post_1 = require("../entity/Post");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../isAuth");
const Profile_1 = require("../entity/Profile");
const typeorm_1 = require("typeorm");
let UpdatedPostResponse = class UpdatedPostResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], UpdatedPostResponse.prototype, "ok", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdatedPostResponse.prototype, "msg", void 0);
UpdatedPostResponse = __decorate([
    type_graphql_1.ObjectType()
], UpdatedPostResponse);
let UpdatePost = class UpdatePost {
    constructor() {
        this.postsEntity = typeorm_1.getRepository(Post_1.Posts);
        this.profileEntity = typeorm_1.getRepository(Profile_1.Profile);
    }
    async updatePost(id, description, { payload }) {
        try {
            const owner = await this.postsEntity.findOne({ userId: String(payload === null || payload === void 0 ? void 0 : payload.userId) });
            if (!owner)
                throw "don't be sneaky, we don't do that here";
            await this.postsEntity.update({ id: id }, { description });
        }
        catch (error) {
            return { ok: false, msg: "can't find the post to update" };
        }
        return { ok: true, msg: "successfully updated the post" };
    }
};
__decorate([
    type_graphql_1.Mutation(() => UpdatedPostResponse),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg("description", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID, String, Object]),
    __metadata("design:returntype", Promise)
], UpdatePost.prototype, "updatePost", null);
UpdatePost = __decorate([
    type_graphql_1.Resolver()
], UpdatePost);
exports.UpdatePost = UpdatePost;
//# sourceMappingURL=UpdatePost.js.map