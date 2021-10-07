"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./router/routes"));
const SampleQuery_1 = require("./Resolvers/SampleQuery");
const AuthResolver_1 = require("./Resolvers/AuthResolver");
const CreatePost_1 = require("./Resolvers/CreatePost");
const DeletePost_1 = require("./Resolvers/DeletePost");
const UpdatePost_1 = require("./Resolvers/UpdatePost");
const CreateComment_1 = require("./Resolvers/CreateComment");
const DeleteComment_1 = require("./Resolvers/DeleteComment");
const UpdateComment_1 = require("./Resolvers/UpdateComment");
const GetComments_1 = require("./Resolvers/GetComments");
const GetSinglePost_1 = require("./Resolvers/GetSinglePost");
const GetAllPosts_1 = require("./Resolvers/GetAllPosts");
const RefreshToken_1 = require("./Resolvers/RefreshToken");
const GetOnlines_1 = require("./Resolvers/GetOnlines");
const React_1 = require("./Resolvers/React");
const VerifyToken_1 = require("./Resolvers/VerifyToken");
const GetInfo_1 = require("./Resolvers/GetInfo");
const SetCookie_1 = require("./Resolvers/SetCookie");
(async () => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cookie_parser_1.default());
    app.use(cors_1.default({ origin: "https://dogentures.netlify.app/", credentials: true }));
    app.use("/", routes_1.default);
    app.use("/images", express_1.default.static(path_1.join(__dirname, "images")));
    await typeorm_1.createConnection().then((connection) => connection
        ? console.log("DB Connected")
        : console.log("DB Failed to Connect"));
    const server = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            validate: false,
            resolvers: [
                SampleQuery_1.Get,
                CreatePost_1.CreatePost,
                AuthResolver_1.AuthResolver,
                DeletePost_1.DeletePost,
                UpdatePost_1.UpdatePost,
                CreateComment_1.CreateComment,
                DeleteComment_1.DeleteComment,
                UpdateComment_1.UpdateComment,
                GetComments_1.GetComments,
                GetSinglePost_1.GetPost,
                GetAllPosts_1.GetAllPosts,
                GetOnlines_1.GetOnlines,
                RefreshToken_1.RefreshToken,
                React_1.React,
                VerifyToken_1.VerifyToken,
                GetInfo_1.GetInfo,
                SetCookie_1.SetCookie,
            ],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await server.start();
    app.use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 4000, () => console.log(`Server Started with PORT: ${process.env.PORT || 4000}`));
})();
//# sourceMappingURL=index.js.map