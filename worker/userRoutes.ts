import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { Env } from './core-utils';
import type { Bug, ApiResponse } from '@shared/types';
import { bugSchema } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/bugs', async (c) => {
        try {
            const durableObjectStub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
            const data = await durableObjectStub.getBugs();
            return c.json({ success: true, data } satisfies ApiResponse<Bug[]>);
        } catch (e) {
            console.error("Failed to get bugs:", e);
            return c.json({ success: false, error: "Failed to retrieve bugs." }, 500);
        }
    });
    app.post('/api/bugs', zValidator('json', bugSchema), async (c) => {
        try {
            const body = c.req.valid('json');
            const newBug: Bug = {
                ...body,
                id: crypto.randomUUID(),
                timestamp: Date.now(),
            };
            const durableObjectStub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
            await durableObjectStub.addBug(newBug);
            return c.json({ success: true, data: newBug } satisfies ApiResponse<Bug>, 201);
        } catch (e) {
            console.error("Failed to add bug:", e);
            return c.json({ success: false, error: "Failed to submit bug." }, 500);
        }
    });
}