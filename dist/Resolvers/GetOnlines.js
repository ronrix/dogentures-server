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
exports.GetOnlines = void 0;
const isAuth_1 = require("../isAuth");
const type_graphql_1 = require("type-graphql");
const Profile_1 = require("../entity/Profile");
const OnlineResType_1 = require("../ObjecTypes/OnlineResType");
let GetOnlines = class GetOnlines {
    async getOnlineUsers() {
        return await Profile_1.Profile.find({ relations: ['user'] });
    }
};
__decorate([
    type_graphql_1.Query(() => [OnlineResType_1.OnlineResponse]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetOnlines.prototype, "getOnlineUsers", null);
GetOnlines = __decorate([
    type_graphql_1.Resolver()
], GetOnlines);
exports.GetOnlines = GetOnlines;
//# sourceMappingURL=GetOnlines.js.map