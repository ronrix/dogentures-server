import { Entity, BaseEntity, Column, ObjectIdColumn, ObjectID } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("postReactors")
export class Messages extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => String)
    @Column("varchar")
    postId: string;

    @Field(() => String)
    @Column("varchar")
    reactor: string;
}
