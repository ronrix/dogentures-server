import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { Posts } from "../entity/Post";
import { Profile } from "../entity/Profile";

import { isAuth } from "../isAuth";

@Resolver()
export class CreatePost {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("file", () => GraphQLUpload)
        { createReadStream, filename }: FileUpload,
        @Arg("name") name: string,
        @Arg("description") description: string
    ) {
        console.log('is called');
        try {
            // folder structure checking, create one if not exists
            const path = join(__dirname, `../images/posts/${name}`);
            if (!existsSync(path)) {
                mkdirSync(path, { recursive: true });
            }
            await new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(
                        createWriteStream(
                            join(
                                __dirname,
                                `../images/posts/${name}/${filename}`
                            )
                        )
                    )
                    .on("finish", async () => {
                        const user = await Profile.findOne({ name });
                        await Posts.insert({
                            userId: String(user?.id),
                            description,
                            image: filename,
                        });
                        resolve(true);
                    })
                    .on("error", () => reject(false));
            });
        } catch (error) {
            return false;
        }
        return true;
    }
}
