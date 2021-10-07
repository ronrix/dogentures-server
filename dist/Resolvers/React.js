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
exports.React = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = require("../entity/Post");
const Comments_1 = require("../entity/Comments");
const isAuth_1 = require("../isAuth");
const mongodb_1 = require("mongodb");
let React = class React {
    constructor() {
        this.postsEntity = typeorm_1.getMongoRepository(Post_1.Posts);
        this.commentsEntity = typeorm_1.getMongoRepository(Comments_1.Comments);
    }
    async reaction(postId, userId) {
        var _a;
        try {
            const post = await this.postsEntity.find(new mongodb_1.ObjectId(postId));
            const comment = await this.commentsEntity.find({ userId: userId });
            console.log(comment);
            if ((_a = comment[0]) === null || _a === void 0 ? void 0 : _a.isReacted) {
                throw "you already reacted to this post";
            }
            await typeorm_1.getMongoRepository(Comments_1.Comments).updateMany({ 'userId': { '$exists': userId } }, { '$set': { 'isReacted': true } });
            if ((post === null || post === void 0 ? void 0 : post.hearts) >= 1) {
                await Post_1.Posts.update({ id: postId }, { hearts: post.hearts + 1 });
            }
            else {
                await Post_1.Posts.update({ id: postId }, { hearts: 1 });
            }
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
    __param(1, type_graphql_1.Arg('userWhoReacted', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID, String]),
    __metadata("design:returntype", Promise)
], React.prototype, "reaction", null);
React = __decorate([
    type_graphql_1.Resolver()
], React);
exports.React = React;
//# sourceMappingURL=React.js.map