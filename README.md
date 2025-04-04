# BreadCrumbs Customer Demo

Customer side integration for [BreadCrumbs platform](https://bread-crumbs.tech/).

Check here the live demo working: [Demo](breadcrumbs-customer-demo.vercel.app)

## Integration Guide

BreadCrumbs tracking integration on your customer side consists in implementing this simple flow:

1. Users are redirected to your website with an event tracking identifier (`crumbId`) as a search parameter in the URL
2. On your client side: Retrieve the `crumbId` from the URL
3. On your server side: Send back the `crumbId` to the specified tracker endpoint to perform the conversion

### Server-Side 

This documentation explains how to integrate the [BreadCrumbs](https://bread-crumbs.tech/docs) tracker on the server side for handling conversions.

#### Authentication

The BreadCrumbs API requires authentication using:

- `X-Client-Id`: Your BreadCrumbs client ID
- `X-Client-Secret`: Your BreadCrumbs client secret

> ⚠️ **Warning:** These credentials must be kept secure on your server and never exposed to the client.

You can find your API keys at:

[BreadCrumbs](https://bread-crumbs.tech) > Builders > Campaigns > [Your Campaign] > Integration

#### API Integration

The server-side integration is implemented in [app/api/convert/route.ts](./app/api/convert/route.ts). 

This endpoint handles converting events by making authenticated requests to the BreadCrumbs Tracking API.

For complete API documentation, visit [BreadCrumbs Tracking API Docs](https://bread-crumbs.tech/api/docs).

#### Implementation Example

Follow these steps to implement server-side conversion tracking:

1. **Environment Setup**

   Configure the following environment variables in your `.env` file:

   ```
   BREADCRUMBS_CLIENT_ID=your_client_id
   BREADCRUMBS_CLIENT_SECRET=your_client_secret
   ```

2. **Access API Keys**

   Retrieve your authentication credentials from environment variables:

   ```typescript
   const BREADCRUMBS_CLIENT_ID = process.env.BREADCRUMBS_CLIENT_ID || '';
   const BREADCRUMBS_CLIENT_SECRET = process.env.BREADCRUMBS_CLIENT_SECRET || '';
   ```

3. **Configure API URL**

   Set up the BreadCrumbs Tracker API endpoint:

   ```typescript
   const BREADCRUMBS_TRACKER_API_URL = 'https:/breadcrumbs.tech/api/tracker/v1';
   ```

4. **Build the Conversion URL**

   Construct the endpoint URL using the `crumbId` of the event you want to convert:

   ```typescript
   const url = `${BREADCRUMBS_TRACKER_URL}/crumbs/${crumbId}/pick`;
   ```

5. **Make the Conversion Request**

   Perform the POST request to the endpoint with the required authentication headers:

   ```typescript
   const response = await fetch(url, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'X-Client-Id': BREADCRUMBS_CLIENT_ID,
           'X-Client-Secret': BREADCRUMBS_CLIENT_SECRET,
       },
   });

   const data = await response.json();
   ```

This request triggers the conversion of the event identified by `crumbId`. Upon success, it records the event as converted on the blockchain and initiates any associated referral payments.

### Client-Side

The BreadCrumbs tracking service is designed to be accessed only from the server side for security reasons.

However, you will need to retrieve the `crumbId` from the URL and send it to your server to perform the conversion process.

You can see a complete client-side implementation example in this demo at [app/page.tsx](./app/page.tsx).

#### Implementation Example

Follow these steps to implement client-side tracking with Next.js:

1. **Retrieve `crumbId` from URL Parameters**

   Extract the crumb identifier from the URL search parameters:

   ```typescript
   import { useSearchParams } from "next/navigation";
   
   export default function Component() {
     const searchParams = useSearchParams();
     const crumbId = searchParams.get('crumbId');
     
     ...
   }
   ```

2. **Send to Your Server**

   Forward the crumb identifier to your server endpoint:

   ```typescript
   fetch('/api/convert', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ crumbId }),
    });
   ```

This approach maintains security by keeping your authentication credentials on the server while still tracking conversion events properly.