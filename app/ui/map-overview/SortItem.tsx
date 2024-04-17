'use client'

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const SortItem = ({ text, prop }: { text: string, prop: string }) => {

    const p = usePathname();
    const sp = useSearchParams();
    const currentSort = sp.has('sort') ? sp.get('sort') : 'created_at';
    const currentOrder = sp.has('order') ? sp.get('order') : 'desc';

    const computeOrder = () => {
        if (currentSort !== prop) return 'desc';
        if (currentOrder === 'desc') return 'asc';
        return 'desc';
    }

    const sortUrl = new URLSearchParams(sp);
    sortUrl.set('order', computeOrder());
    sortUrl.set('sort', prop);

    return (
        <Link href={`${p}?${sortUrl.toString()}`} replace={true} scroll={false}>
            <div
                className={`flex items-center gap-1 border ${currentSort === prop ? 'border-blue-500' : ''} rounded pl-1.5 pr-1 py-0.5 hover:text-blue-600 ${currentSort === prop ? 'text-blue-600' : 'text-blue-400'}`}>
                <p className='text-xs'>{text}</p>
                {currentOrder === 'asc' && currentSort === prop ? <ArrowUpIcon className="h-2.5" /> : <ArrowDownIcon className="h-2.5" />}
            </div>
        </Link>
    )
}
export default SortItem