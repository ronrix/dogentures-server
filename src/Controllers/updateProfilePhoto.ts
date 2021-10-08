import { Request, Response } from "express";

import { Profile } from "../entity/Profile";
import { getConnection } from "typeorm";

export const updateProfilePhoto = async (req: Request, res: Response) => {
    await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Profile)
        .values([
            {
                name: req?.body?.name,
                age: req?.body.age,
                avatar: req?.file?.path,
            },
        ])
        .execute();
    res.json({ ok: true });
};
