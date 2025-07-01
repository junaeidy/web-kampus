import React from "react";
import { Link } from "@inertiajs/react";

export default function Navbar({ navigations }) {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex space-x-6 py-4">
                    {navigations.map((nav) => (
                        <li key={nav.id} className="relative group">
                            <Link
                                href={
                                    nav.url ||
                                    (nav.page
                                        ? route("pages.show", nav.page.slug)
                                        : "#")
                                }
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                {nav.label}
                            </Link>

                            {nav.children && nav.children.length > 0 && (
                                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {nav.children.map((child) => (
                                        <li key={child.id}>
                                            <Link
                                                href={child.url || (child.page?.slug ? route("pages.show", child.page.slug) : "#")}

                                                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
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
        </nav>
    );
}
