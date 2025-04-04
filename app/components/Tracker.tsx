'use client';

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DEMO_CRUMB_ID = '06eabfdcf1847b0355668247';

const Tracker = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const crumbId = searchParams.get('crumbId');

    const [isLoading, setIsLoading] = useState(false);

    const convertOnServer = useCallback((_crumbId: string) => fetch('/api/convert', {
        method: 'POST',
        body: JSON.stringify({ crumbId: _crumbId }),
    }).then(async (response) => {

        if (response.ok === false) {
            const errorMessage = await response.json().then((data) => data.error);
            throw new Error(errorMessage);
        }

        // Remove the crumbId from the URL
        router.replace(window.location.pathname);

        return response.json();
    }), []);

    const handleButtonClick = useCallback(async () => {
        setIsLoading(true);

        if (!crumbId) {
            throw new Error('No crumbId found');
        }

        await toast.promise(convertOnServer(crumbId),
            {
                pending: 'Converting...',
                success: {
                    render() {
                        setIsLoading(false);
                        return 'Conversion process started';
                    },
                },
                error: {
                    render({ data }: { data: any }) {
                        setIsLoading(false);
                        return String(data.message);
                    },
                },
            }
        );

        setIsLoading(false);
    }, [crumbId]);

    useEffect(() => {
        if (!crumbId) {
            // If there is no crumbId, we will set demo crumbId in the URL
            router.replace(window.location.pathname + '?crumbId=' + DEMO_CRUMB_ID);
        }
    }, []);

    return (
        <div className="flex flex-col gap-4 ">
            <p>
                If you have been redirected here through a BreadCrumbs link, you have a <code className="bg-gray-500 p-1 rounded-md">?crumbId=[crumbId]</code> parameter in the URL. It identifies the event generated by you as user.
                Click the button below to perform a conversion of the crumb.
            </p>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
                <button
                    className="cursor-pointer rounded-full bg-amber-500 text-white hover:bg-amber-600 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 min-w-[140px]"
                    disabled={isLoading || !crumbId}
                    onClick={handleButtonClick}
                    type="button"
                >
                    {isLoading ? 'Converting...' : 'Convert'}
                </button>
                <p className="text-gray-500">
                    Crumb ID: {crumbId}
                </p>
            </div>
        </div>
    );
};

export default Tracker;
