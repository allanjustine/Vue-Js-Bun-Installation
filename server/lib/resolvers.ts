import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./db/schema";

export const root = {
  users: async ({
    limit = 10,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }) => {
    return await db.select().from(users).limit(limit).offset(offset);
  },
  user: async ({ id }: { id: string }) => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)));
    return user ?? null;
  },
};
