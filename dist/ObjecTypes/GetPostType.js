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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostType = void 0;
const type_graphql_1 = require("type-graphql");
const Profile_1 = require("../entity/Profile");
const Comments_1 = require("../entity/Comments");
let GetPostType = class GetPostType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GetPostType.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => Profile_1.Profile, { nullable: true }),
    __metadata("design:type", Profile_1.Profile)
], GetPostType.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GetPostType.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [Comments_1.Comments], { nullable: true }),
    __metadata("design:type", Array)
], GetPostType.prototype, "comments", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GetPostType.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], GetPostType.prototype, "heart", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], GetPostType.prototype, "created_at", void 0);
GetPostType = __decorate([
    type_graphql_1.ObjectType()
], GetPostType);
exports.GetPostType = GetPostType;
//# sourceMappingURL=GetPostType.js.map