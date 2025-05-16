// todo: use your own token
const token =
  "sgp_uPakg0SUZTinqNPx4FBMhx956FXMdmi8IBirjhssCjyopqRz2ra4JbIa9XSqdHEO";

// todo: add the mappings here of ALL relevant name to destination id
const destinations = {
  "SOURCE:_ReactNativeAppProd_DEST:_Bloomreach": "67ff7e0a66d10a57eff83029",
};

// todo: update this to be the filter you want to apply, so the title and the
// actions would be the main things to edit / change
const excludePropertiesRule = {
  title: "Filter all Context Fields (new)",
  description:
    "All Contexts have been filtered from event fields as Bloomreach cannot handle attribute event sizes larger than 255 properties.  The above causes the event to balloon in size and the result is the event gets dropped from the Bloomreach side.  The filter stops this happening.",
  if: "all",
  enabled: true,
  actions: [
    {
      type: "DROP_PROPERTIES",
      fields: {
        context: [
          "app",
          "device",
          "traits",
          "consent",
          "instanceId",
          "ip",
          "library",
          "event_transformed",
          "locale",
          "network",
          "os",
          "protocols",
          "screen",
          "referrer",
          "transforms_beta",
          "active",
          "page",
          "userAgent",
          "userAgentData",
          "channel",
          "groupId",
          "campaign",
          "timezone",
        ],
      },
    },
  ],
};

async function main() {
  for (const [name, id] of Object.entries(destinations)) {
    const { data: destinationDetails } = await getDestination(id);
    const sourceId = destinationDetails.destination.sourceId;

    const { data: destinationFilters } = await getDestinationFilters(id);

    let patched = false;

    for (const filter of destinationFilters.filters) {
      if (filter.title === excludePropertiesRule.title) {
        patched = true;
        console.log(`Updating filter ${filter.title} for ${name}`);
        console.log(
          await updateDestinationFilter(id, filter.id, excludePropertiesRule)
        );
        break;
      }
    }

    if (!patched) {
      console.log(
        `Creating filter ${excludePropertiesRule.title} for ${name} ${sourceId}`
      );
      console.log(
        await createDestinationFilter(id, sourceId, excludePropertiesRule)
      );
    }
  }
}

main();

async function apiRequest(url: string, method: string = "GET", body?: any) {
  const res = await fetch("https://api.segmentapis.com" + url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

function getDestination(id?: string) {
  return apiRequest(`/destinations/${id}`);
}

function getDestinationFilters(id?: string) {
  return apiRequest(`/destination/${id}/filters`);
}

function getDestinationFilter(id?: string, filterId?: string) {
  return apiRequest(`/destination/${id}/filters/${filterId}`);
}

function updateDestinationFilter(destId: string, filterId: string, body: {}) {
  return apiRequest(
    `/destination/${destId}/filters/${filterId}`,
    "PATCH",
    body
  );
}

function createDestinationFilter(destId: string, sourceId: string, body: {}) {
  return apiRequest(`/destination/${destId}/filters`, "POST", {
    sourceId,
    ...body,
  });
}
