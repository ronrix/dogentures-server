import { Field, ObjectType, ID } from "type-graphql";
import {
    Entity,
    BaseEntity,
    ObjectIdColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ObjectID,
} from "typeorm";
//import { Profile } from "./Profile";
//import { Posts } from "./Post";

@ObjectType()
@Entity("comments")
export class Comments extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => ID, { nullable: true })
    @ObjectIdColumn()
    userId: ObjectID;

    @Field(() => ID, {nullable: true})
    @ObjectIdColumn()
    postId: ObjectID;

    @Field({ nullable: true })
    @Column("varchar")
    comment: string;

    @Field()
    @Column('boolean')
    isReacted: boolean;

    @Field({ nullable: true })
    @CreateDateColumn()
    created_at: Date;

    @Field({ nullable: true })
    @UpdateDateColumn()
    update_at: Date;
}
