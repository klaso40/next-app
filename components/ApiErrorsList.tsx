import {XCircleIcon} from '@heroicons/react/outline'
import ResponseError from '../types/ResponseError'

type PropsType = {
    apiErrors: ResponseError | null
}

const ApiErrorsList = ({ apiErrors }: PropsType) => {

    return (
        <>
            {
                apiErrors &&

                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800"> {apiErrors.message}</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul role="list" className="list-disc pl-5 space-y-1">
                                    {
                                        apiErrors.errors?.map((err, idx) =>(<li key={idx}>{err}</li>))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ApiErrorsList
