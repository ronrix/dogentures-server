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
exports.Comments = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Comments = class Comments extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Comments.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Comments.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Comments.prototype, "postId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Comments.prototype, "comment", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], Comments.prototype, "isReacted", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comments.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Comments.prototype, "update_at", void 0);
Comments = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("comments")
], Comments);
exports.Comments = Comments;
//# sourceMappingURL=Comments.js.map