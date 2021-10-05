import { ObjectType, Field } from "type-graphql";

@ObjectType()
class File {
    @Field(() => String!)
    filename: string;

    @Field(() => String!)
    mimetype: string;

    @Field(() => String!)
    encoding: string;
}

@ObjectType()
export class Post {
    @Field(() => String!)
    description: string;

    @Field(() => String!)
    filePath: File;
}
