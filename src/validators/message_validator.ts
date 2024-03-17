import { z } from "zod";
export const sendMessageSchema = z
  .object({
    message: z.string(),
    image: z.any(),
  })
  .required({ message: true, image: true });
