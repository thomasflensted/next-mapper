'use client'

import { deleteMap } from '@/app/lib/actions/mapActions'
import * as Alert from '@radix-ui/react-alert-dialog';
import { useParams } from 'next/navigation'

const DeleteMapButton = () => {

    const params = useParams()
    const map_id = params.id;

    return (
        <Alert.Root>
            <Alert.Trigger asChild>
                <button className="bg-white mt-2 hover:bg-red-50 text-red-500 font-medium py-1.5 rounded text-sm w-full border border-red-200">Delete Map</button>
            </Alert.Trigger>
            <Alert.Portal>
                <Alert.Overlay className='fixed top-0 left-0 w-full h-full bg-black opacity-20' />
                <Alert.Content className='fixed w-1/4 p-8 -translate-x-1/2 bg-white border rounded-lg shadow-lg top-56 left-1/2'>
                    <Alert.Title className='text-sm font-medium text-red-600'>Are you sure you want to delete this map?</Alert.Title>
                    <Alert.Description className='my-2 text-sm font-light'>The map and all its associated places will be deleted. This action cannot be undone.</Alert.Description>
                    <div className='flex justify-end mt-4'>
                        <Alert.Cancel className='bg-white border rounded px-6 py-1.5 text-sm font-medium mr-2 hover:bg-gray-50 transition-all'>Cancel</Alert.Cancel>
                        <button onClick={() => deleteMap(+map_id)} className='bg-white border text-red-600 border-red-200 rounded px-6 py-1.5 text-sm font-medium hover:bg-red-50 transition-all'>Delete</button>
                    </div>
                </Alert.Content>
            </Alert.Portal>
        </Alert.Root>
    )
}
export default DeleteMapButton