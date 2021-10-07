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
exports.RefreshToken = void 0;
const User_1 = require("../entity/User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let RefreshToken = class RefreshToken {
    async revokeRefreshTokensForUser(id) {
        await typeorm_1.getConnection()
            .getRepository(User_1.User)
            .increment({ id }, "tokenVersion", 1);
        return true;
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RefreshToken.prototype, "revokeRefreshTokensForUser", null);
RefreshToken = __decorate([
    type_graphql_1.Resolver()
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map