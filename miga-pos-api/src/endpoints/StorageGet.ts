import { NotFoundException, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext } from "../types";

export class StorageGet extends OpenAPIRoute {
  schema = {
    tags: ["Storage"],
    summary: "Get a value from storage",

    request: {
      params: z.object({
        key: z.string(),
      }),
    },

    responses: {
      "200": {
        description: "Storage value",
      },
    },
  };

async handle(c: AppContext) {
  const data = await this.getValidatedData<typeof this.schema>();
  const { key } = data.params;

  try {
    const result = await c.env.miga_pos_db
      .prepare("SELECT value FROM storage WHERE key = ?")
      .bind(key)
      .first();

    console.log("DB Result:", result);

    if (!result || result.value == null) {
      return null;
    }

    return JSON.parse(String(result.value));
  } catch (err) {
    console.error("StorageGet error:", err);
    throw err;
  }
}
}