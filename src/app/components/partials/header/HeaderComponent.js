import Link from "next/link";
import { useState } from "react";
import ButtonOrderNow from "../button/ButtonOrderNowComponent";

export default function Header({ mode, cart = [], setShowCart }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (mode === "welcome") {
        return (
            <>
                <header className="flex items-center justify-between px-6 py-4 bg-[#fef6ee] shadow-md sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-black">xiomun</h1>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-4 text-sm">
                        <Link href="/menu" className="hover:underline text-black">Home</Link>
                        <Link href="/menu" className="hover:underline text-black">Offer</Link>
                        <Link href="/menu" className="hover:underline text-black">Products</Link>
                        <Link href="/menu" className="hover:underline text-black">Pages</Link>
                    </nav>

                    {/* Order button (desktop) */}
                    <div className="hidden md:inline-block">
                        <ButtonOrderNow style="w-full bg-[#723c16] hover:bg-[#5c2f11] text-white px-4 py-2 rounded-lg shadow" />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 text-black"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={
                                    isMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </header>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden fixed top-[64px] left-0 right-0 bg-[#fef6ee] px-6 py-4 shadow-md z-20">
                        <nav className="flex flex-col space-y-2 text-sm">
                            <Link href="/toot" className="hover:underline text-black" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link href="/menu" className="hover:underline text-black" onClick={() => setIsMenuOpen(false)}>Offer</Link>
                            <Link href="/menu" className="hover:underline text-black" onClick={() => setIsMenuOpen(false)}>Products</Link>
                            <Link href="/menu" className="hover:underline text-black" onClick={() => setIsMenuOpen(false)}>Pages</Link>
                            <Link href="/menu" className="mt-2" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full bg-[#723c16] hover:bg-[#5c2f11] text-white px-4 py-2 rounded-lg shadow">
                                    Order now
                                </button>
                            </Link>
                        </nav>
                    </div>
                )}
            </>
        );
    }

    if (mode === "menu") {
        return (
            <header className="flex items-center justify-between px-6 py-4 bg-[#fef6ee] shadow-md sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-black">xiomun</h1>
                <div
                    className="relative cursor-pointer"
                    onClick={() => setShowCart && setShowCart((prev) => !prev)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#723c16]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h14l1-5H6.4M7 13L5 6H3m4 7v6m0 0a2 2 0 104 0m-4 0a2 2 0 11-4 0"
                        />
                    </svg>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </div>
            </header>
        );
    }

    return null;
}
