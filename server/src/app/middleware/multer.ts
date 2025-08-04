// src/app/middleware/multer.ts
import multer from "multer";

const storage = multer.memoryStorage(); // keep in memory or use diskStorage if saving to disk

export const upload = multer({ storage });
