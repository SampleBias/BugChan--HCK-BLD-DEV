import { z } from 'zod';
export const ERROR_TYPES = [
  "Build Failure",
  "Runtime Error",
  "UI Glitch",
  "Typo",
  "Feature Request",
  "Unresolved Websocket Error",
  "Other"
] as const;
export const bugSchema = z.object({
  errorType: z.enum(ERROR_TYPES),
  subject: z.string().max(100).optional(),
  description: z.string().min(1, "Description is required.").max(5000),
  imageUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
});
export type BugFormValues = z.infer<typeof bugSchema>;
export interface Bug extends BugFormValues {
  id: string;
  timestamp: number; // UTC milliseconds
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}