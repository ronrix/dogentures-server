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
exports.Profile = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Profile = class Profile extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Profile.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("date", { nullable: true }),
    __metadata("design:type", Date)
], Profile.prototype, "bdate", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("bool", { default: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "online", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.Column(() => User_1.User),
    __metadata("design:type", User_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Profile.prototype, "date", void 0);
Profile = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("profile")
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map