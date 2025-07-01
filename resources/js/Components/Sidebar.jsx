import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

import {
    Squares2X2Icon,
    DocumentIcon,
    UsersIcon,
    BuildingLibraryIcon,
    AcademicCapIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    Bars3CenterLeftIcon,
} from "@heroicons/react/24/outline";

const navItems = [
    {
        href: route("admin.dashboard"),
        icon: Squares2X2Icon,
        label: "Dashboard",
        name: "admin.dashboard",
    },
    {
        href: "/admin/pages",
        icon: DocumentIcon,
        label: "Halaman",
        name: "admin.pages",
    },
    {
        href: "/admin/navigations",
        icon: Bars3CenterLeftIcon,
        label: "Navigasi Menu",
        name: "admin.navigations",
    },
    {
        href: "/admin/faculties",
        icon: BuildingLibraryIcon,
        label: "Fakultas",
        name: "admin.faculties",
    },
    {
        href: "/admin/lecturers",
        icon: AcademicCapIcon,
        label: "Dosen",
        name: "admin.lecturers",
    },
    {
        href: "/admin/users",
        icon: UsersIcon,
        label: "Pengguna",
        name: "admin.users",
    },
    {
        href: "/admin/settings",
        icon: Cog6ToothIcon,
        label: "Pengaturan",
        name: "admin.settings",
    },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, isCollapsed }) {
    const { url, component } = usePage();
    const [tooltipContent, setTooltipContent] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (e, label) => {
        if (isCollapsed) {
            const itemRect = e.currentTarget.getBoundingClientRect();
            setTooltipContent(label);
            setTooltipPosition({
                top: itemRect.top + itemRect.height / 2,
                left: itemRect.right + 12,
            });
            setShowTooltip(true);
        }
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <aside
            className={`bg-white text-gray-800 ${
                isCollapsed ? "w-20" : "w-64"
            } space-y-6 py-6 px-4 fixed inset-y-0 left-0 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 transition-all duration-200 ease-in-out z-30 shadow-xl md:shadow-none rounded-r-2xl md:rounded-r-none`}
        >
            {/* Logo */}
            <div className="flex flex-col items-center justify-center space-y-3 pb-6 border-b border-gray-100">
                <Link
                    href={route("admin.dashboard")}
                    className="flex flex-col items-center"
                >
                    <ApplicationLogo
                        className={`h-12 w-auto fill-current text-blue-700 ${
                            isCollapsed ? "mb-0" : "mb-2"
                        }`}
                    />
                    {!isCollapsed && (
                        <>
                            <span className="text-xl font-bold text-gray-800 whitespace-nowrap">
                                STAI AL-HIKMAH
                            </span>
                            <span className="text-sm text-gray-500">
                                Administrator
                            </span>
                        </>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 flex-grow">
                {navItems.map(({ href, icon: Icon, label, name }) => {
                    const isActive = route().current(`${name}*`);
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`relative flex items-center gap-4 py-2.5 px-4 text-base font-medium rounded-lg transition-all duration-200 group
                                ${
                                    isActive
                                        ? "text-blue-700 font-semibold bg-blue-50/70"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                }`}
                            onMouseEnter={(e) => handleMouseEnter(e, label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Icon className={`w-6 h-6 shrink-0 ${isActive ? "text-blue-700" : "text-gray-500 group-hover:text-blue-600"}`} />
                            {!isCollapsed && (
                                <span className="truncate">{label}</span>
                            )}
                            {isActive && (
                                <span className="absolute left-0 top-0 h-full w-1 rounded-r-lg bg-blue-600"></span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="mt-auto border-t border-gray-100 pt-4">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center gap-4 py-2.5 px-4 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 w-full text-left hover:bg-red-50 hover:text-red-600"
                    onMouseEnter={(e) => handleMouseEnter(e, "Keluar")}
                    onMouseLeave={handleMouseLeave}
                >
                    <ArrowRightOnRectangleIcon className="w-6 h-6 transform rotate-180 text-gray-500 group-hover:text-red-600" />
                    {!isCollapsed && <span className="truncate">Keluar</span>}
                </Link>
            </div>

            {/* Tooltip Component */}
            {showTooltip && isCollapsed && (
                <div
                    className="fixed px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-90 transition-opacity duration-150 ease-in-out pointer-events-none z-50 whitespace-nowrap"
                    style={{
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        transform: 'translateY(-50%)',
                    }}
                >
                    {tooltipContent}
                    <div
                        className="absolute w-3 h-3 bg-gray-800 rotate-45"
                        style={{
                            left: '-6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    ></div>
                </div>
            )}
        </aside>
    );
}