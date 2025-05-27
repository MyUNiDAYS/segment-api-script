import "dotenv/config";
import {
  createDestinationFilter,
  FiltersInDestination,
  getDestination,
  getDestinationFilters,
  updateDestinationFilter,
} from "./api";
import { processEnvSchema, type Filter } from "./schemas";
import { DESTINATIONS_DEV, DESTINATIONS_PROD } from "./const";
import { loadFilters } from "./load-filters";

const { ENV } = processEnvSchema.parse(process.env);

const destinations = ENV === "dev" ? DESTINATIONS_DEV : DESTINATIONS_PROD;

async function upsertFilter({
  filtersInDestination,
  filter,
  destinationId,
  destinationName,
  sourceId,
}: {
  filtersInDestination: FiltersInDestination;
  filter: Filter;
  destinationId: string;
  destinationName: string;
  sourceId: string;
}) {
  const filterInDestination = filtersInDestination.data.filters.find(
    (f) => f.title === filter.title
  );
  if (filterInDestination) {
    console.log(`Updating filter ${filter.title} in ${destinationName}`);
    await updateDestinationFilter(destinationId, sourceId, filter);
  } else {
    console.log(`Creating filter ${filter.title} in ${destinationName}`);
    await createDestinationFilter(destinationId, sourceId, filter);
  }
}

async function main() {
  for (const [name, id] of Object.entries(destinations)) {
    const { data: destinationDetails } = await getDestination(id);
    const sourceId = destinationDetails.destination.sourceId;

    const filtersInDestination = await getDestinationFilters(id);

    const filtersToSync = await loadFilters();

    await Promise.all(
      filtersToSync.map((filter) =>
        upsertFilter({
          filtersInDestination,
          filter,
          destinationId: id,
          destinationName: name,
          sourceId,
        })
      )
    );
  }
}

main();
