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
exports.GetPost = void 0;
const isAuth_1 = require("../isAuth");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entity/Post");
const GetPostType_1 = require("../ObjecTypes/GetPostType");
let GetPost = class GetPost {
    async getSinglePost(id) {
        const post = await Post_1.Posts.findOne({ id }, { relations: ['user', 'comments', 'comments.user'] });
        return post;
    }
};
__decorate([
    type_graphql_1.Query(() => GetPostType_1.GetPostType),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetPost.prototype, "getSinglePost", null);
GetPost = __decorate([
    type_graphql_1.Resolver()
], GetPost);
exports.GetPost = GetPost;
//# sourceMappingURL=GetSinglePost.js.map