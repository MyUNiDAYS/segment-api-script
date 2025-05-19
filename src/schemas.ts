import { z } from "zod";

export const processEnvSchema = z.object({
  ENV: z.enum(["dev", "prod"]),
  SEGMENT_API_TOKEN: z.string(),
});

// Schema for the fields object in actions
export const FieldsSchema = z.record(z.string(), z.array(z.string()));

// Schema for a single action
export const ActionSchema = z.object({
  type: z.enum(["ALLOW_PROPERTIES", "DROP", "DROP_PROPERTIES", "SAMPLE"]),
  fields: FieldsSchema.optional(),
  percent: z.number().min(0).max(1).optional(),
  path: z.string().optional(),
});

// Main CreateFilterPayload schema
export const FilterSchema = z.object({
  if: z.string(),
  actions: z.array(ActionSchema),
  title: z.string(),
  description: z.string().optional(),
  enabled: z.boolean(),
});

// Type inference
export type Filter = z.infer<typeof FilterSchema>;
export type Action = z.infer<typeof ActionSchema>;
export type Fields = z.infer<typeof FieldsSchema>;
