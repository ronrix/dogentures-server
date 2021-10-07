import "dotenv/config";
import "reflect-metadata";

import express from "express";
import {join} from 'path';
// ts-ignore
import cookieParser from "cookie-parser";

import { ApolloServer } from "apollo-server-express";
// ts-ignore
import { graphqlUploadExpress } from "graphql-upload";

import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";

import router from "./router/routes";
import { Get } from "./Resolvers/SampleQuery";
import { AuthResolver } from "./Resolvers/AuthResolver";
import { CreatePost } from "./Resolvers/CreatePost";
import { DeletePost } from "./Resolvers/DeletePost";
import { UpdatePost } from "./Resolvers/UpdatePost";
import { CreateComment } from "./Resolvers/CreateComment";
import { DeleteComment } from "./Resolvers/DeleteComment";
import { UpdateComment } from "./Resolvers/UpdateComment";
import { GetComments } from "./Resolvers/GetComments";
import { GetPost } from "./Resolvers/GetSinglePost";
import { GetAllPosts } from "./Resolvers/GetAllPosts";
import { RefreshToken } from "./Resolvers/RefreshToken";
import { GetOnlines } from "./Resolvers/GetOnlines";
import { React } from "./Resolvers/React";
import { VerifyToken } from "./Resolvers/VerifyToken";
import { GetInfo } from "./Resolvers/GetInfo";
import { SetCookie } from "./Resolvers/SetCookie"; 


(async () => {

    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    //app.use(cors());
    app.use(cors({ origin: "https://dogentures.netlify.app", credentials: true }));

    app.use("/", router);
    app.use("/images", express.static(join(__dirname, "images")));

    // create db connection
    await createConnection().then((connection) =>
        connection
            ? console.log("DB Connected")
            : console.log("DB Failed to Connect")
    );

    // Provide resolver functions for your schema fields
    // using type-graphql, we don't have to put the typeDefs of
    // the apolloServer since schema also acts like a typeDefs and resolver at the same time
    const server = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [
                Get,
                CreatePost,
                AuthResolver,
                DeletePost,
                UpdatePost,
                CreateComment,
                DeleteComment,
                UpdateComment,
                GetComments,
                GetPost,
                GetAllPosts,
                GetOnlines,
                RefreshToken,
                React,
                VerifyToken,
                GetInfo,
                SetCookie,  
            ],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    // if we're not going to use buildSchema  | using type-graphql
    // probably we're going to use typeDefs and resolvers along with it
    // const server = new ApolloServer({
    //     typeDefs: gql``,
    //     resolvers: {}
    // })

    // start apolloServer before applyMiddleware for the express server
    await server.start();

    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 4000, () =>
        console.log(`Server Started with PORT: ${process.env.PORT || 4000}`)
    );
})();
