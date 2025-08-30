import { useEffect, useRef, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
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

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleMouseEnterDropdown = (navId) => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setOpenDropdown(navId);
    };

    const handleMouseLeaveDropdown = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 150);
    };

    const toggleDesktopDropdown = (navId) =>
        setOpenDropdown(openDropdown === navId ? null : navId);

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
        if (targetHref !== "/" && currentUrl.startsWith(targetHref)) return true;
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

    const renderDropdownItems = (items, level = 0) => (
        <ul
            className={`bg-white rounded-b-xl shadow-lg z-50 whitespace-nowrap p-2 min-w-[220px] ${
                level > 0 ? "ml-2 mt-1 border border-gray-100" : ""
            }`}
        >
            {items.map((item) => {
                const href =
                    item.url ||
                    (item.page?.slug ? route("pages.show", item.page.slug) : "#");
                const active = isActive(href);
                return (
                    <motion.li
                        key={item.id}
                        className="relative group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link
                            href={href}
                            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 relative
                                ${
                                    active
                                        ? "bg-custom-blue text-white font-semibold"
                                        : "text-gray-700 hover:text-custom-blue"
                                }
                            `}
                        >
                            {/* Indicator bar */}
                            <span
                                className={`absolute left-0 h-6 w-1 rounded-r-lg transition-all duration-300
                                ${
                                    active
                                        ? "bg-custom-blue"
                                        : "bg-transparent group-hover:bg-custom-blue"
                                }`}
                            />
                            {/* Label */}
                            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                {item.label}
                            </span>
                        </Link>

                        {/* 🔹 Child / Grandchild */}
                        {item.children && item.children.length > 0 && (
                            <div className="absolute left-full top-0 mt-0 hidden group-hover:block">
                                {renderDropdownItems(item.children, level + 1)}
                            </div>
                        )}
                    </motion.li>
                );
            })}
        </ul>
    );

    // 🔹 Dropdown Mobile (accordion framer-motion)
    const renderMobileDropdownItems = (items, level = 0) => (
        <ul className={`pl-${level * 4} mt-1 space-y-1`}>
            {items.map((item) => {
                const href =
                    item.url ||
                    (item.page?.slug ? route("pages.show", item.page.slug) : "#");
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
                                    onClick={() => toggleMobileDropdown(item.id)}
                                    className="ml-2 p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
                                >
                                    <motion.svg
                                        animate={{ rotate: isOpen ? 90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </motion.svg>
                                </button>
                            )}
                        </div>

                        {/* Anak (expand/collapse) */}
                        <AnimatePresence>
                            {hasChildren && isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="pl-4"
                                >
                                    {renderMobileDropdownItems(
                                        item.children,
                                        level + 1
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white md:bg-white/80 md:backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo + Text → tampil di mobile saja */}
                <div className="flex items-center space-x-3 md:hidden">
                    <ApplicationLogo className="h-8 w-8 sm:h-10 sm:w-10" />
                    <Link href="/" className="flex flex-col leading-tight">
                        <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                        STAI Al-Hikmah
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                        Pariangan Batusangkar
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu → rata tengah */}
                <div className="hidden md:flex items-center space-x-6 justify-center flex-1">
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
                                    className={`relative px-3 py-2 text-base md:text-lg font-medium transition-colors duration-300
                                        ${
                                            active
                                                ? "text-custom-blue"
                                                : "text-gray-700 hover:text-custom-blue"
                                        }`}
                                    onClick={(e) => {
                                        if (nav.children?.length) {
                                            e.preventDefault();
                                            toggleDesktopDropdown(nav.id);
                                        }
                                    }}
                                >
                                    {nav.label}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {nav.children &&
                                        nav.children.length > 0 &&
                                        openDropdown === nav.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-0 mt-3 z-50"
                                            >
                                                {renderDropdownItems(nav.children)}
                                            </motion.div>
                                        )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 hover:text-custom-blue transition"
                    >
                        <svg
                            className="h-7 w-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay (tidak diubah) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={toggleMobileMenu}
                    >
                        {/* Sidebar mobile → solid background */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute right-0 top-0 h-full w-3/4 bg-white shadow-2xl p-4 overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center border-b pb-3">
                                <Link href="/" className="flex flex-col leading-tight">
                                    <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                                    STAI Al-Hikmah
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-600">
                                    Pariangan Batusangkar
                                    </span>
                                </Link>
                                <button
                                    onClick={toggleMobileMenu}
                                    className="text-gray-600 hover:text-red-500 transition text-lg sm:text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="mt-4">
                                {renderMobileDropdownItems(navigations)}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
