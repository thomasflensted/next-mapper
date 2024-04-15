import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const SortItem = ({ currentSort, currentOrder, text, prop }: { currentSort: string, currentOrder: string, text: string, prop: string }) => {

    const computeOrder = () => {
        if (currentSort !== prop) return 'desc';
        if (currentOrder === 'desc') return 'asc';
        return 'desc';
    }

    return (
        <Link href={'/maps?sort=' + prop + '&order=' + computeOrder()} replace={true}>
            <div
                className={`flex items-center gap-1 border ${currentSort === prop ? 'border-blue-500' : ''} rounded pl-1.5 pr-1 py-0.5 hover:text-blue-600 ${currentSort === prop ? 'text-blue-600' : 'text-blue-400'}`}>
                <p className='text-xs'>{text}</p>
                {currentOrder === 'asc' && currentSort === prop ? <ArrowUpIcon className="h-2.5" /> : <ArrowDownIcon className="h-2.5" />}
            </div>
        </Link>
    )
}
export default SortItem