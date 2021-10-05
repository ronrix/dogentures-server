import { createWriteStream } from 'fs';
import { join } from 'path';
import {Resolver, Mutation, Arg, Int} from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";

import { Profile } from "../entity/Profile";

@Resolver()
export class UpdateProfile {
    @Mutation(() => Boolean)
    async updateProfile(@Arg('id', () => Int) id: number, 
                        @Arg('file', () => GraphQLUpload) {createReadStream, filename}: FileUpload,
                        @Arg("name", () => String) name: string, 
                        @Arg('bdate', () => Date) bdate: Date
        ) {
        try {
            await new Promise((resolve, reject) => {
                createReadStream()
                .pipe(createWriteStream(join(__dirname, `../images/profile/${filename}`)))
                .on('finish', async () => {
                    await Profile.update({id}, {avatar: filename, name, bdate})
                    resolve(true)
                })
                .on('error', () => reject(false));
            });
        } catch(err) {
            return false;
        }
        return true;
    }
}
