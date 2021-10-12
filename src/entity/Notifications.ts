import { Entity, BaseEntity, Column, ObjectIdColumn, ObjectID, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("notification")
export class Notification extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => String)
    @Column("varchar")
    sendTo: string;

    @Field(() => String)
    @Column("varchar")
    sendFrom: string;
    
    @Field(() => Boolean)
    @Column("boolean")
    isComment: boolean;

    @Field(() => Boolean)
    @Column("boolean")
    isReact: boolean;

    @Field(() => Boolean)
    @Column('varchar')
    isViewed: boolean;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;
}
