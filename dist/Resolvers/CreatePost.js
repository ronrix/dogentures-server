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
exports.CreatePost = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entity/Post");
const Profile_1 = require("../entity/Profile");
const isAuth_1 = require("../isAuth");
let CreatePost = class CreatePost {
    async createPost({ createReadStream, filename }, name, description) {
        console.log('is called');
        try {
            const path = path_1.join(__dirname, `../images/posts/${name}`);
            if (!fs_1.existsSync(path)) {
                fs_1.mkdirSync(path, { recursive: true });
            }
            await new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(fs_1.createWriteStream(path_1.join(__dirname, `../images/posts/${name}/${filename}`)))
                    .on("finish", async () => {
                    const user = await Profile_1.Profile.findOne({ name });
                    await Post_1.Posts.insert({
                        userId: String(user === null || user === void 0 ? void 0 : user.id),
                        description,
                        image: filename,
                    });
                    resolve(true);
                })
                    .on("error", () => reject(false));
            });
        }
        catch (error) {
            return false;
        }
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(1, type_graphql_1.Arg("name")),
    __param(2, type_graphql_1.Arg("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CreatePost.prototype, "createPost", null);
CreatePost = __decorate([
    type_graphql_1.Resolver()
], CreatePost);
exports.CreatePost = CreatePost;
//# sourceMappingURL=CreatePost.js.map