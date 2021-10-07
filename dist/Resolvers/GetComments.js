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
exports.GetComments = void 0;
const type_graphql_1 = require("type-graphql");
const Comments_1 = require("../entity/Comments");
const Profile_1 = require("../entity/Profile");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let CommentRes = class CommentRes {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", typeorm_1.ObjectID)
], CommentRes.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", typeorm_1.ObjectID)
], CommentRes.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CommentRes.prototype, "comment", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", typeorm_1.ObjectID)
], CommentRes.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field(() => Profile_1.Profile),
    __metadata("design:type", Profile_1.Profile)
], CommentRes.prototype, "commentersInfo", void 0);
__decorate([
    type_graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CommentRes.prototype, "created_at", void 0);
CommentRes = __decorate([
    type_graphql_1.ObjectType()
], CommentRes);
let GetComments = class GetComments {
    constructor() {
        this.commentEntity = typeorm_1.getMongoRepository(Comments_1.Comments);
    }
    async getComments(postId) {
        return await this.commentEntity.find({ postId: new mongodb_1.ObjectId(postId) });
    }
};
__decorate([
    type_graphql_1.Query(() => [CommentRes]),
    __param(0, type_graphql_1.Arg('postId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectID]),
    __metadata("design:returntype", Promise)
], GetComments.prototype, "getComments", null);
GetComments = __decorate([
    type_graphql_1.Resolver()
], GetComments);
exports.GetComments = GetComments;
//# sourceMappingURL=GetComments.js.map