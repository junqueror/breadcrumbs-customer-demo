import { NextRequest, NextResponse } from 'next/server';


const BREADCRUMBS_CLIENT_ID = process.env.BREADCRUMBS_CLIENT_ID || '';
const BREADCRUMBS_CLIENT_SECRET = process.env.BREADCRUMBS_CLIENT_SECRET || '';
const BREADCRUMBS_CONVERSION_TYPE = process.env.BREADCRUMBS_CONVERSION_TYPE || 'CustomAction';

const BREADCRUMBS_TRACKER_API_URL = 'https://bread-crumbs.tech/api/tracker/v1';

export async function POST(req: NextRequest) {
    const { crumbId } = await req.json();

    const url = `${BREADCRUMBS_TRACKER_API_URL}/pick`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Id': BREADCRUMBS_CLIENT_ID,
                'X-Client-Secret': BREADCRUMBS_CLIENT_SECRET,
            },
            body: JSON.stringify({
                crumbId,
                conversionType: BREADCRUMBS_CONVERSION_TYPE
            }),
        });

        const data = await response.json();

        console.info(data);

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to convert event' }, { status: 500 });
    }

}
