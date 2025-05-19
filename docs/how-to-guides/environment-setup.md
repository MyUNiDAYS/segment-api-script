# Environment Setup

This guide will help you set up your environment to run the Segment API Script.

## Prerequisites

- Node.js (v16 or higher)
- pnpm (v8 or higher)
- A Segment account with API access

## Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd segment-api-script
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory with the following variables:

   ```env
   SEGMENT_API_TOKEN=your_segment_api_token
   ```

4. **Get your Segment API token**

   You have two options to get your Segment API token:

   **Option 1: Direct from Segment**

   - Go to your Segment workspace
   - Navigate to Settings > API Keys
   - Create a new API key or use an existing one
   - Copy the token to your `.env` file

   **Option 2: AWS Parameter Store**

   - Access the AWS Systems Manager Parameter Store
   - Navigate to the parameter `/Segment/ApiToken`
   - The token will be automatically retrieved by the script if you have proper AWS credentials configured
