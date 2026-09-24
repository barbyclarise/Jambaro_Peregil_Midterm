import { type Request, type Response, Router } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { pool } from "./db";
import { type Microservice } from "./type";
import { validateResource } from "./validate";
import { createMicroserviceSchema, updateMicroserviceSchema } from "./schemas";
import { authenticateToken } from "./authMiddleware";
const router = Router();
// Every route below requires a valid JWT
router.use(authenticateToken);
// GET /api/incidents?search=vpn — READ all (search is optional)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const result = await pool.query(
      `
SELECT *
FROM services
WHERE title ILIKE $1
ORDER BY id ASC
`,
      ["%" + (search ?? "") + "%"],
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
// POST /api/incidents — CREATE
router.post(
  "/",
  validateResource(createMicroserviceSchema),
  async (req: Request, res: Response) => {
    const { id, name, endpointUrl, environment, status, version, ownerEmail, createdAt }: Microservice = req.body;
    const { userId } = req.user as JwtPayload;
    try {
      const result = await pool.query(
        `INSERT INTO incidents (id, name, endpointUrl, environment, status, version, ownerEmail, createdAt)
VALUES ($1, $2, $3, $4)
RETURNING *`,
        [id, name, endpointUrl, environment, status, version, ownerEmail, createdAt],
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);
// PATCH /api/incidents/:id — UPDATE status and/or severity
router.patch(
  "/:id",
  validateResource(updateMicroserviceSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, envi } = req.body;
    try {
      const result = await pool.query(
        `UPDATE incidents
SET status = COALESCE($1, status),
envi = COALESCE($2, envi),
updated_at = NOW()
WHERE id = $3
RETURNING *`,
        [status ?? null, envi?? null, id],
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
);
// DELETE /api/incidents/:id — DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM incidents
WHERE id = $1
RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
export default router;
