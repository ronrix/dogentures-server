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
exports.CreateComment = void 0;
const type_graphql_1 = require("type-graphql");
const Comments_1 = require("../entity/Comments");
const Post_1 = require("../entity/Post");
const Profile_1 = require("../entity/Profile");
const typeorm_1 = require("typeorm");
const isAuth_1 = require("../isAuth");
const mongodb_1 = require("mongodb");
let CreateComment = class CreateComment {
    constructor() {
        this.postsEntity = typeorm_1.getRepository(Post_1.Posts);
        this.commentEntity = typeorm_1.getRepository(Comments_1.Comments);
        this.profileEntity = typeorm_1.getRepository(Profile_1.Profile);
    }
    async createComment(postId, comment, { payload }) {
        var _a, _b;
        try {
            const posts = await this.postsEntity.find();
            const post = posts.filter((post) => String(post.id) === String(postId));
            if (!post)
                throw "no post to comment";
            const isReacted = await Comments_1.Comments.find({ where: { userId: new mongodb_1.ObjectId(payload === null || payload === void 0 ? void 0 : payload.userId) } });
            if (isReacted.length !== 0) {
                console.log('isReacted is not null');
                if (isReacted[0].isReacted) {
                    await this.commentEntity.insert({ userId: new mongodb_1.ObjectId(payload === null || payload === void 0 ? void 0 : payload.userId), comment, postId: (_a = post[0]) === null || _a === void 0 ? void 0 : _a.id, isReacted: true });
                    return;
                }
            }
            await this.commentEntity.insert({ userId: new mongodb_1.ObjectId(payload === null || payload === void 0 ? void 0 : payload.userId), comment, postId: (_b = post[0]) === null || _b === void 0 ? void 0 : _b.id });
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
    __param(1, type_graphql_1.Arg("comment", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID, String, Object]),
    __metadata("design:returntype", Promise)
], CreateComment.prototype, "createComment", null);
CreateComment = __decorate([
    type_graphql_1.Resolver()
], CreateComment);
exports.CreateComment = CreateComment;
//# sourceMappingURL=CreateComment.js.map