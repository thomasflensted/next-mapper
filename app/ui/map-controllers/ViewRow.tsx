'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

const ViewRow = () => {

    const sp = useSearchParams();
    const p = usePathname()

    const nextUrl = new URLSearchParams(sp);
    if (sp.has('view')) { nextUrl.delete('view') } else { nextUrl.set('view', 'list') };

    return (
        <Link href={`${p}?${nextUrl.toString()}`} scroll={false}>
            <p className="font-medium text-blue-500 text-xs border px-2 py-0.5 rounded">
                {sp.has('view') ? 'Hide List' : 'Show List'}
            </p>
        </Link>
    )
}
export default ViewRow