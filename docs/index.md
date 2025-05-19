# Segment API Script Documentation

- [How-to Guides](how-to-guides/): Step-by-step instructions for common tasks
- [Reference](reference/): Technical reference documentation
- [Tutorials](tutorials/): Learning-oriented guides

## Overview

This script helps manage Segment destination filters by providing functionality to:

- Load filter configurations from JSON files
- Create or update filters in Segment destinations
- Support multiple environments (dev/prod)
- Validate filter configurations using Zod schemas

## Quick Start

1. Set up your environment variables (see [Environment Setup](how-to-guides/environment-setup.md))
2. Place your filter configurations in the `filters` directory
3. Run the script with the appropriate environment:
   ```bash
   pnpm sync:dev
   ```
