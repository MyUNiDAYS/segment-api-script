import { Filter, FilterSchema } from "./schemas";
import path from "path";
import fs from "fs/promises";

export const loadFilters = async (): Promise<Filter[]> => {
  const filtersDir = path.join(__dirname, "../filters");
  const filterFiles = await fs.readdir(filtersDir);

  const filterContents = await Promise.all(
    filterFiles.map(async (filename) => {
      const content = await fs.readFile(
        path.join(filtersDir, filename),
        "utf-8"
      );
      const typedFilter = FilterSchema.safeParse(JSON.parse(content));
      if (!typedFilter.success) {
        throw new Error(
          `Invalid filter in ${filename}: ${typedFilter.error.message}`
        );
      }
      return typedFilter.data;
    })
  );

  return filterContents;
};
