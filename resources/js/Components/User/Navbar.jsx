import { useEffect, useRef, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Navbar({ navigations }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState({});

    const dropdownTimeoutRef = useRef(null);
    const { url } = usePage();

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
        setOpenMobileDropdown({});
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
    }, [url]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMouseEnterDropdown = (navId) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(navId);
    };

    const handleMouseLeaveDropdown = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const toggleDesktopDropdown = (navId) => {
        setOpenDropdown(openDropdown === navId ? null : navId);
    };

    const toggleMobileDropdown = (navId) => {
        setOpenMobileDropdown((prev) => ({
            ...prev,
            [navId]: !prev[navId],
        }));
    };

    const isActive = (href, children = []) => {
        const currentUrl = url.split("?")[0];
        const targetHref = href.split("?")[0];
        if (targetHref === "/" && currentUrl === "/") return true;
        if (targetHref !== "/" && currentUrl.startsWith(targetHref))
            return true;
        return children?.some((child) => {
            const childHref =
                child.url ||
                (child.page?.slug ? route("pages.show", child.page.slug) : "#");
            return (
                childHref !== "#" &&
                currentUrl.startsWith(childHref.split("?")[0])
            );
        });
    };

    const renderDropdown = (items, level = 0) => (
        <ul
            className={`bg-white shadow-lg rounded-lg py-1 ${
                level > 0 ? "absolute left-full top-0 ml-1" : ""
            }`}
        >
            {items.map((item) => (
                <li key={item.id} className="relative group">
                    <Link
                        href={
                            item.url ||
                            (item.page?.slug
                                ? route("pages.show", item.page.slug)
                                : "#")
                        }
                        className="relative block px-4 py-2 rounded-lg whitespace-nowrap group-hover:text-white transition-all duration-200
                    text-gray-700 hover:bg-custom-blue"
                    >
                        {item.label}
                    </Link>

                    {item.children && item.children.length > 0 && (
                        <div className="group-hover:visible group-hover:opacity-100 opacity-0 invisible absolute left-full top-0 mt-0 transition-opacity duration-200 z-50">
                            {renderDropdown(item.children, level + 1)}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    const renderDropdownItems = (items, level = 0) => (
        <ul
            className={`bg-white rounded-lg shadow-lg z-50 whitespace-nowrap ${
                level === 0
                    ? "absolute left-0 mt-2 py-1 min-w-[200px]"
                    : "absolute left-full top-0 mt-0 hidden group-hover:block min-w-[200px]"
            }`}
        >
            {items.map((item) => {
                const href =
                    item.url ||
                    (item.page?.slug
                        ? route("pages.show", item.page.slug)
                        : "#");
                const active = isActive(href);
                return (
                    <li key={item.id} className="relative group">
                        <Link
                            href={href}
                            className={`relative block px-4 py-2 rounded-lg overflow-hidden transition-all duration-300 whitespace-nowrap
                                ${
                                    active
                                        ? "bg-custom-blue text-white"
                                        : "text-gray-600 hover:bg-custom-blue hover:text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                        {item.children && item.children.length > 0 && (
                            <div className="absolute top-0 left-full mt-0 hidden group-hover:block z-50">
                                {renderDropdownItems(item.children, level + 1)}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    const renderMobileDropdownItems = (items, level = 0) => (
        <ul className={`pl-${level * 4} mt-1 space-y-1`}>
            {items.map((item) => {
                const href =
                    item.url ||
                    (item.page?.slug
                        ? route("pages.show", item.page.slug)
                        : "#");
                const active = isActive(href);
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openMobileDropdown?.[item.id];

                return (
                    <li key={item.id}>
                        <div className="flex justify-between items-center">
                            <Link
                                href={href}
                                className={`block flex-grow py-2 px-3 rounded-lg font-medium transition duration-200
                                ${
                                    active
                                        ? "bg-custom-blue text-white"
                                        : "text-gray-700 hover:bg-custom-blue hover:text-white"
                                }`}
                                onClick={(e) => {
                                    if (hasChildren) {
                                        e.preventDefault();
                                        toggleMobileDropdown(item.id);
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                            {hasChildren && (
                                <button
                                    onClick={() =>
                                        toggleMobileDropdown(item.id)
                                    }
                                    className="ml-2 p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
                                >
                                    <svg
                                        className={`h-4 w-4 transform transition-transform duration-200 ${
                                            isOpen ? "rotate-90" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Tampilkan anak jika isOpen true */}
                        {hasChildren && isOpen && (
                            <div className="pl-4">
                                {renderMobileDropdownItems(
                                    item.children,
                                    level + 1
                                )}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <ApplicationLogo className="h-10 w-10" />
                    <Link
                        href="/"
                        className="ml-2 text-2xl font-bold text-gray-800"
                    >
                        STAI Al-Hikmah Pariangan
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-3">
                    {navigations.map((nav) => {
                        const href =
                            nav.url ||
                            (nav.page?.slug
                                ? route("pages.show", nav.page.slug)
                                : "#");
                        const active = isActive(href, nav.children);
                        return (
                            <div
                                key={nav.id}
                                className="relative"
                                onMouseEnter={() =>
                                    nav.children?.length &&
                                    handleMouseEnterDropdown(nav.id)
                                }
                                onMouseLeave={() =>
                                    nav.children?.length &&
                                    handleMouseLeaveDropdown()
                                }
                            >
                                <Link
                                    href={href}
                                    className="relative block px-3 py-2 rounded-lg font-medium overflow-hidden transition-all duration-300 group"
                                    onClick={(e) => {
                                        if (nav.children?.length) {
                                            e.preventDefault();
                                            toggleDesktopDropdown(nav.id);
                                        }
                                    }}
                                >
                                    <span
                                        className={`absolute inset-0 w-0 bg-custom-blue transition-all duration-300 group-hover:w-full z-0 rounded-lg
                                            ${active ? "w-full" : ""}`}
                                    ></span>
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            active
                                                ? "text-white"
                                                : "text-gray-700 group-hover:text-white"
                                        }`}
                                    >
                                        {nav.label}
                                    </span>
                                </Link>
                                {nav.children &&
                                    nav.children.length > 0 &&
                                    openDropdown === nav.id && (
                                        <div>
                                            {renderDropdownItems(nav.children)}
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </div>

                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-600 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={toggleMobileMenu}
            >
                <div
                    className="w-3/4 bg-white h-full shadow-lg overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 flex justify-between items-center border-b">
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-800"
                        >
                            STAI Al-Hikmah Pariangan
                        </Link>
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        {renderMobileDropdownItems(navigations)}
                    </div>
                </div>
            </div>
        </nav>
    );
}
