'use client'
import Link from "next/link";


export default function ButtonOrderNow({style}){
    return (
        <Link href="/menu" className="mt-2" onClick={() => setIsMenuOpen(false)}>
            <button className={style}>
                Order now
            </button>
        </Link>
    );
}


//style yang ada di header w-full bg-[#723c16] hover:bg-[#5c2f11] text-white px-4 py-2 rounded-lg shadow
//style di halaman depan bg-[#723c16] hover:bg-[#5c2f11] text-white px-4 py-2 rounded-sm shadow