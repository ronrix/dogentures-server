import { Context } from "../Context";
import { Resolver, Mutation, Arg, Ctx, Int } from "type-graphql";
import { User } from "../entity/User";
import { hash, compare } from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../auth";
import { LoginResponse } from "../ObjecTypes/LoginResType";
import { RegisterResponse } from "../ObjecTypes/RegisterResType";
import { Profile } from "../entity/Profile";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from "fs";

// mongo
import { getMongoRepository } from "typeorm";

@Resolver()
export class AuthResolver {
    userEntity = getMongoRepository(User);
    profileEntity = getMongoRepository(Profile);

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Ctx() { res }: Context
    ) {
        console.log("logging in");
        const user = await this.userEntity.findOne({ email: email });

        try {
            if (!user) throw "invalid user";
            const valid = await compare(password, user.password);
            if (!valid) throw "username or password is incorrect";
            // update db online column to true after a successful login
            await this.profileEntity.update({ user: {id: user?.id} }, { online: true });
        } catch (e) {
            console.log("error: ", e);
            return {
                msg: e,
                ok: false,
            };
        }

        const token = createRefreshToken(user);

        // token set to cookie > this is for the refresh token to store
        res.cookie("session-auth", token, { httpOnly: true });

        const profileToken = await this.profileEntity.findOne({ user });

        // returning accessToken to store in the client's storage like localStorage
        return {
            accessToken: createAccessToken(profileToken),
            ok: true,
        };
    }

    @Mutation(() => Boolean)
    async logout(@Arg("id", () => Int) id: number) {
        try {
            // update online column
            await this.profileEntity.update({ id }, { online: false });
            // update tokenVersion
        } catch (err) {
            return false;
        }
        return true;
    }

    @Mutation(() => RegisterResponse)
    async register(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Arg("name", () => String) name: string,
        @Arg("bdate", () => Date) bdate: Date,
        @Arg("file", () => GraphQLUpload)
        { createReadStream, filename }: FileUpload,
        @Ctx() { res }: Context
    ) {
        const isAlreadyAUser = await this.userEntity.findOne({ email });
        if (isAlreadyAUser)
            return { ok: false, msg: "email is already in use" };

        const hashedPassword = await hash(password, 12);

        // check directory for storing image profile
        const path = join(__dirname, `../images/profile/${name}`);
        if (!existsSync(path)) mkdirSync(path, { recursive: true });

        let user: any;
        try {
            // insert user to user table
            await this.userEntity.insert({
                email,
                password: hashedPassword,
            });

            // get the user before storing inside profile table
            user = await this.userEntity.findOne({ email });

            await new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(
                        createWriteStream(
                            join(
                                __dirname,
                                `../images/profile/${name}/${filename}`
                            )
                        )
                    )
                    .on("finish", async () => {
                        await this.profileEntity.insert({
                            name,
                            bdate,
                            user,
                            avatar: filename,
                        });
                        resolve(true);
                    })
                    .on("error", () => reject(false));
            });
        } catch (err) {
            return res.status(500).json({ ok: false, msg: err });
        }

        // token set to cookie > this is for the refresh token to store
        res.cookie("session-auth", createRefreshToken(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
        });

        // get the data
        const profile = await this.profileEntity.findOne({ name });

        // response with a token
        return {
            accessToken: createAccessToken(user),
            ok: true,
            avatar: profile?.avatar,
            name: profile?.name,
            online: profile?.online,
        };
    }
}
