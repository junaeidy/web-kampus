import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";

export default function Navbar({ navigations }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    const isActive = (href) => {
        if (href === '/' && url === '/') {
            return true;
        }
        if (href !== '/' && url.startsWith(href)) {
            return true;
        }
        return false;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo dan Nama Institusi */}
                <div className="flex items-center">
                    <ApplicationLogo className="h-10 w-10" />
                    <Link href="/" className="ml-2 text-2xl font-bold text-gray-800">
                        STAI Al-Hikmah Pariangan
                    </Link>
                </div>

                {/* Navigasi Utama (Desktop) */}
                <div className="hidden md:flex items-center space-x-6">
                    {navigations.map((nav) => (
                        <div key={nav.id} className="relative group">
                            <Link
                                href={
                                    nav.url ||
                                    (nav.page ? route("pages.show", nav.page.slug) : "#")
                                }
                                className="relative block px-3 py-2 rounded-lg font-medium group overflow-hidden transition-all duration-300"
                            >
                                {/* Sliding background */}
                                <span className={`absolute inset-0 w-0 bg-custom-blue transition-all duration-300 group-hover:w-full z-0 rounded-lg
                                    ${isActive(nav.url || (nav.page?.slug ? route("pages.show", nav.page.slug) : "#")) ? 'w-full' : ''}`}>
                                </span>

                                {/* Label */}
                                <span className={`relative z-10 transition-colors duration-300 
                                    ${isActive(nav.url || (nav.page?.slug ? route("pages.show", nav.page.slug) : "#")) ? 'text-white' : 'text-gray-700 group-hover:text-white'}`}>
                                    {nav.label}
                                </span>
                            </Link>


                            {/* Dropdown Menu */}
                            {nav.children && nav.children.length > 0 && (
                                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {nav.children.map((child) => (
                                        <li key={child.id}>
                                            <Link
                                                href={child.url || (child.page?.slug ? route("pages.show", child.page.slug) : "#")}
                                                className="relative block px-4 py-2 rounded-lg group overflow-hidden transition-all duration-300"
                                            >
                                                {/* Sliding background */}
                                                <span className={`absolute inset-0 w-0 bg-custom-blue transition-all duration-300 group-hover:w-full z-0 rounded-lg
                                                    ${isActive(child.url || (child.page?.slug ? route("pages.show", child.page.slug) : "#")) ? 'w-full' : ''}`}>
                                                </span>

                                                {/* Label */}
                                                <span className={`relative z-10 transition-colors duration-300 
                                                    ${isActive(child.url || (child.page?.slug ? route("pages.show", child.page.slug) : "#")) ? 'text-white' : 'text-gray-600 group-hover:text-white'}`}>
                                                    {child.label}
                                                </span>
                                            </Link>

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tombol Mobile Menu */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <div
                className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                onClick={toggleMobileMenu}
            >
                <div
                    className="w-3/4 bg-white h-full shadow-lg overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 flex justify-between items-center border-b">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            STAI Al-Hikmah Pariangan
                        </Link>
                        <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col space-y-1 p-4">
                        {navigations.map((nav) => (
                            <li key={nav.id}>
                                <Link
                                    href={
                                        nav.url ||
                                        (nav.page
                                            ? route("pages.show", nav.page.slug)
                                            : "#")
                                    }
                                    className={`block py-2 px-3 rounded-lg font-medium transition duration-200
                                        ${isActive(nav.url || (nav.page?.slug ? route("pages.show", nav.page.slug) : "#")) ? 'bg-custom-blue text-white' : 'text-gray-700 hover:bg-custom-blue hover:text-white'}`}
                                >
                                    {nav.label}
                                </Link>
                                {nav.children && nav.children.length > 0 && (
                                    <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
                                        {nav.children.map((child) => (
                                            <li key={child.id}>
                                                <Link
                                                    href={child.url || (child.page?.slug ? route("pages.show", child.page.slug) : "#")}
                                                    className={`block py-2 px-3 rounded-lg transition duration-200
                                                        ${isActive(child.url || (child.page?.slug ? route("pages.show", child.page.slug) : "#")) ? 'bg-custom-blue text-white' : 'text-gray-600 hover:bg-custom-blue hover:text-white'}`}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
