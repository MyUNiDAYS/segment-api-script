import { API_BASE_URL } from "./const";
import { Filter } from "./schemas";

// API Configuration

if (!process.env.SEGMENT_API_TOKEN) {
  throw new Error("SEGMENT_API_TOKEN environment variable is required");
}

// Base API request function
async function apiRequest<T>(
  url: string,
  method: string = "GET",
  body?: any
): Promise<T> {
  const res = await fetch(API_BASE_URL + url, {
    headers: {
      Authorization: `Bearer ${process.env.SEGMENT_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export type Destination = {
  data: { destination: { sourceId: string } };
};

export type FiltersInDestination = {
  data: {
    filters: {
      title: string;
      id: string;
      destinationId: string;
      sourceId: string;
    }[];
  };
};

// Destination API functions
export async function getDestination(id: string): Promise<Destination> {
  return apiRequest(`/destinations/${id}`);
}

export async function getDestinationFilters(
  id: string
): Promise<FiltersInDestination> {
  return apiRequest(`/destination/${id}/filters`);
}

export async function getDestinationFilter(id: string, filterId: string) {
  return apiRequest(`/destination/${id}/filters/${filterId}`);
}

export async function updateDestinationFilter(
  destId: string,
  filterId: string,
  body: Filter
) {
  return apiRequest(
    `/destination/${destId}/filters/${filterId}`,
    "PATCH",
    body
  );
}

export async function createDestinationFilter(
  destId: string,
  sourceId: string,
  body: Filter
) {
  return apiRequest(`/destination/${destId}/filters`, "POST", {
    ...body,
    sourceId,
  });
}
