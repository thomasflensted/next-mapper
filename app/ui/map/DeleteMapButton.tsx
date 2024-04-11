'use client'

import { deleteMap } from '@/app/lib/mapActions'
import * as RadixDialog from '@radix-ui/react-alert-dialog'

const DeleteMapButton = ({ id }: { id: string }) => {

    const deleteWithId = deleteMap.bind(null, id);

    return (
        <RadixDialog.Root>
            <div>
                <RadixDialog.Trigger className="bg-white border border-red-200 font-light text-red-600 rounded text-xs px-4 py-2 hover:bg-red-50">Delete Map</RadixDialog.Trigger>
            </div>
            <RadixDialog.Portal>
                <RadixDialog.Overlay className='bg-black opacity-20 fixed top-0 left-0 w-full h-full' />
                <RadixDialog.Content className='bg-white p-8 rounded-lg border fixed -translate-x-1/2 top-56 left-1/2 w-1/4 shadow-lg'>
                    <RadixDialog.Title className='text-red-600 text-sm font-medium'>Are you sure you want to delete this map?</RadixDialog.Title>
                    <RadixDialog.Description className='text-sm font-light my-2'>The map and all its associated places will be deleted. This action cannot be undone.</RadixDialog.Description>
                    <form className='text-right mt-5' action={deleteWithId}>
                        <RadixDialog.Cancel className='bg-white border rounded px-6 py-1.5 text-sm font-medium mr-2 hover:bg-gray-50 transition-all'>Cancel</RadixDialog.Cancel>
                        <button type='submit' className='bg-white border text-red-600 border-red-200 rounded px-6 py-1.5 text-sm font-medium hover:bg-red-50 transition-all'>Delete</button>
                    </form>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}
export default DeleteMapButton