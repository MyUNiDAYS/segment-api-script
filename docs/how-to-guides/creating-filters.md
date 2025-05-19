# Creating Segment Destination Filters

This guide will guide you through creating and managing filters for Segment destinations.

## Understanding Filters

Filters in Segment allow you to control which events and properties are sent to your destinations. They can:

- Drop specific properties
- Allow only certain properties
- Sample events
- Drop entire events

## Creating a Filter

1. **Create a JSON file**
   Create a new file in the `filters` directory, e.g., `my-filter.json`:

   ```json
   {
     "title": "My Custom Filter",
     "description": "Filters out sensitive data",
     "if": "all",
     "enabled": true,
     "actions": [
       {
         "type": "DROP_PROPERTIES",
         "fields": {
           "context": ["ip", "userAgent"]
         }
       }
     ]
   }
   ```

2. **Validate your filter**
   The script will automatically validate your filter against the schema. Common issues:

   - Missing required fields
   - Invalid action types
   - Malformed JSON

3. **Sync your filter**
   After creating and validating your filter, you need to sync it to your environments:

   ```bash
   # First, sync to dev environment to test
   pnpm sync:dev

   # After testing and confirming it works as expected, sync to production
   pnpm sync:prod
   ```

   ⚠️ **Important**: Always test your filters in the dev environment first before syncing to production.

## Best Practices

1. **Use descriptive titles**

   - Make it clear what the filter does
   - ⚠️ **Important**: Titles are used as unique identifiers. Changing a filter's title will create a new filter instead of updating the existing one. Choose titles carefully and avoid changing them once created.

2. **Add descriptions**

   - Explain why the filter exists
