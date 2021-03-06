import { Field, ObjectType, ID } from "type-graphql";
import {
    Entity,
    BaseEntity,
    Column,
    ObjectIdColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ObjectID
} from "typeorm";
//import { Comments } from "./Comments";

@ObjectType()
@Entity("post")
export class Posts extends BaseEntity { 

    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => String)
    @Column('varchar')
    userId: string;

    @Field()
    @Column("varchar")
    description: string;

   /* @Field(() => [Comments])
    @Column(() => Comments)
    comments: Comments[];*/

    @Field()
    @Column("varchar")
    image: string;

    @Field()
    @Column({ type: "int", default: 0, nullable: true })
    hearts: number;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @UpdateDateColumn()
    update_at: Date;
}
