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
exports.Get = void 0;
const type_graphql_1 = require("type-graphql");
const Profile_1 = require("../entity/Profile");
const typeorm_1 = require("typeorm");
let UsersResponse = class UsersResponse {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], UsersResponse.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UsersResponse.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UsersResponse.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], UsersResponse.prototype, "bdate", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], UsersResponse.prototype, "online", void 0);
__decorate([
    type_graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UsersResponse.prototype, "date", void 0);
UsersResponse = __decorate([
    type_graphql_1.ObjectType()
], UsersResponse);
let Get = class Get {
    constructor() {
        this.profileEntity = typeorm_1.getRepository(Profile_1.Profile);
    }
    async getUsers({ req }) {
        console.log(req.cookies);
        console.log(this.profileEntity);
        const users = await this.profileEntity.find();
        console.log(users);
        return users;
    }
};
__decorate([
    type_graphql_1.Query(() => [UsersResponse]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Get.prototype, "getUsers", null);
Get = __decorate([
    type_graphql_1.Resolver()
], Get);
exports.Get = Get;
//# sourceMappingURL=SampleQuery.js.map