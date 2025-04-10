# BreadCrumbs Customer Demo

Customer side integration for [BreadCrumbs platform](https://bread-crumbs.tech/).

## Usage

### Understanding the tracking flow

BreadCrumbs uses a postback tracking system based on blockchain technology to ensure trustlessness and transparency. Here's how it works:

BreadCrumbs tracking integration on your customer side consists in implementing the following flow:

1. **Referral Click**: A user clicks on a campaign referral/affiliate link
2. **Crumb Creation**: BreadCrumbs creates a tracking event ("crumb") with a unique ID
3. **Redirect**: The user is redirected to your website with the `crumbId` in the URL
4. **Conversion**: When the user completes the desired action on your site, you send the `crumbId` back by sending a "pick" request from your server to confirm the conversion
5. **Reward**: BreadCrumbs processes the conversion and distributes rewards on-chain

### Retrieve the `crumbId` from the URL (Client Side)

The BreadCrumbs tracking service is designed to be accessed only from the server side for security reasons.

You will need to retrieve the `crumbId` from the URL and send it to your server to perform the conversion process.

#### Implementation

In this guide, we will use Next.js to retrieve the `crumbId` from the URL and send it to the server.

1. **Retrieve `crumbId` from URL parameters**

   Extract the crumb identifier from the URL search parameters:

   ```typescript
   import { useSearchParams } from "next/navigation";
   
   export default function Component() {
     const searchParams = useSearchParams();
     const crumbId = searchParams.get('crumbId');
     
     ...
   }
   ```

2. **Send it to your server**

   Forward the crumb identifier to your server endpoint:

   ```typescript
   fetch('/your-custom-endpoint', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ crumbId }),
    });
   ```

This approach maintains security by keeping your authentication credentials on the server and avoiding fraudulent conversions on client side, while still tracking conversion events properly.

### Send back the `crumbId` to convert the event (Server Side)

To convert the event, you will need to send back the `crumbId` to the [BreadCrumbs Tracker API](https://bread-crumbs.tech/api/docs) on the server side.

#### Authentication

The BreadCrumbs API requires authentication using:

- `X-Client-Id`: Your BreadCrumbs client ID
- `X-Client-Secret`: Your BreadCrumbs client secret

You can find your API keys at:

- [BreadCrumbs App > Builders > Campaigns](https://bread-crumbs.tech/app/advertisers/campaigns) > [Your Campaign] > Security

> ⚠️ **Warning:** These credentials must be kept secure on your server and never exposed client side.

#### Implementation

Follow these steps to implement server-side conversion tracking:

1. **Environment setup**

   Configure the following environment variables in your `.env` file:

   ```
   BREADCRUMBS_CLIENT_ID=your_client_id
   BREADCRUMBS_CLIENT_SECRET=your_client_secret
   ```

   <br />

2. **Access API keys**

   Retrieve your authentication credentials from environment variables:

   ```typescript
   const BREADCRUMBS_CLIENT_ID = process.env.BREADCRUMBS_CLIENT_ID || '';
   const BREADCRUMBS_CLIENT_SECRET = process.env.BREADCRUMBS_CLIENT_SECRET || '';
   ```

   <br />

3. **Configure BreadCrumbs Tracker API URL**

   Set up the BreadCrumbs Tracker API endpoint:

   ```typescript
   const BREADCRUMBS_TRACKER_API_URL = 'https:/breadcrumbs.tech/api/tracker/v1';
   ```
   <br />

4. **Build the conversion URL**

   Construct the endpoint URL for conversions:

   ```typescript
   const url = `${BREADCRUMBS_TRACKER_URL}/pick`;
   ```

   For complete API documentation about conversion endpoint, visit [BreadCrumbs Tracking API Docs](https://bread-crumbs.tech/api/docs#/Tracker/pickCrumb).
   
   <br />

5. **Make the conversion request**

   Perform the POST request to the endpoint with the required configuration:
   - Authentication headers
   - Identifier of the event to be converted in the body as `crumbId`
   - Conversion type in the body as `conversionType`

   ```typescript
   const BREADCRUMBS_CLIENT_ID = process.env.BREADCRUMBS_CLIENT_ID || '';
   const BREADCRUMBS_CLIENT_SECRET = process.env.BREADCRUMBS_CLIENT_SECRET || '';
   const BREADCRUMBS_TRACKER_API_URL = 'https:/breadcrumbs.tech/api/tracker/v1';

   const url = `${BREADCRUMBS_TRACKER_URL}/pick`;

   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'X-Client-Id': BREADCRUMBS_CLIENT_ID,
         'X-Client-Secret': BREADCRUMBS_CLIENT_SECRET,
       },
      body: JSON.stringify({ 
         crumbId: 'CRUMB_ID',
         conversionType: 'CONVERSION_TYPE'
      }),
   });

   const data = await response.json();
   ```

   Where:
   - **Authentication headers** can be retrieved from the BreadCrumbs dashboard, in the [BreadCrumbs App > Builders > Campaigns](https://bread-crumbs.tech/app/advertisers/campaigns) > [Your Campaign] > Security
   - **`CRUMB_ID`** must be retrieved from the URL parameters on the client side. Check the [Client Side](#client-side) section for more details
   - **`CONVERSION_TYPE`** can be retrieved from the BreadCrumbs dashboard, in the [BreadCrumbs App > Builders > Campaigns](https://bread-crumbs.tech/app/advertisers/campaigns) > [Your Campaign] > Integration

This request triggers the conversion of the event identified by `crumbId`. Upon success, it records the event as converted on the blockchain and initiates any associated referral payments.

## Example

Live demo: [BreadCrumbs Customer Demo](breadcrumbs-customer-demo.vercel.app)

You can see a complete client side implementation example in this demo at [app/page.tsx](./app/page.tsx).

The server side integration is implemented in [app/api/convert/route.ts](./app/api/convert/route.ts). 

## FAQ

### How to get the `crumbId`?

The `crumbId` is a unique identifier for the event to be converted. It is generated by the BreadCrumbs platform when the user clicks on a link. It is used to track the event on the blockchain and can be converted from customer side.

## Documentation

- For more information about the BreadCrumbs platform for builders, visit the [BreadCrumbs Docs for Builders](https://bread-crumbs.tech/docs/builders)
- For more information about the BreadCrumbs platform for developers, visit the [BreadCrumbs Docs for Developers](https://bread-crumbs.tech/docs/developers)