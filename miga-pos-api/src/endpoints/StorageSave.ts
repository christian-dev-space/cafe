import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext } from "../types";

export class StorageSave extends OpenAPIRoute {
  schema = {
    tags: ["Storage"],
    summary: "Save a value to storage",

    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              key: z.string(),
              value: z.any(),
            }),
          },
        },
      },
    },

    responses: {
      "200": {
        description: "Saved successfully",
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();

    const { key, value } = data.body;

    await c.env.miga_pos_db
      .prepare(
        `INSERT INTO storage (key, value)
         VALUES (?, ?)
         ON CONFLICT(key)
         DO UPDATE SET
           value = excluded.value,
           updated_at = CURRENT_TIMESTAMP`
      )
      .bind(
        key,
        JSON.stringify(value)
      )
      .run();

    return {
      success: true,
    };
  }
}