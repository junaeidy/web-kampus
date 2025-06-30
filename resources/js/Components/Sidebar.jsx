import React from "react";
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

    return (
        <aside
            className={`bg-white text-gray-800 ${
                isCollapsed ? "w-20" : "w-72"
            } space-y-6 py-8 px-4 fixed inset-y-0 left-0 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 transition-all duration-200 ease-in-out z-30 shadow-xl rounded-r-3xl`}
        >
            {/* Logo */}
            <div className="flex flex-col items-center space-y-2">
                <Link
                    href={route("admin.dashboard")}
                    className="flex flex-col items-center"
                >
                    <ApplicationLogo
                        className={`h-10 w-auto fill-current text-blue-700 ${
                            isCollapsed ? "mb-0" : "mb-1"
                        }`}
                    />
                    {!isCollapsed && (
                        <>
                            <span className="text-lg font-semibold text-gray-800">
                                STAI AL-HIKMAH
                            </span>
                            <span className="text-xs text-gray-500">
                                Administrator
                            </span>
                        </>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                {navItems.map(({ href, icon: Icon, label, name }) => {
                    const isActive = route().current(`${name}*`);
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center gap-4 py-3 px-5 text-base font-medium rounded-lg mx-2 transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-blue-100"
                                }`}
                        >
                            <Icon className="w-6 h-6 shrink-0" />
                            {!isCollapsed && (
                                <span className="truncate">{label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="mt-6 border-t border-gray-200 pt-4">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center gap-4 py-3 px-5 text-base font-medium text-gray-700 rounded-lg mx-2 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                >
                    <ArrowRightOnRectangleIcon className="w-6 h-6 transform rotate-180" />
                    {!isCollapsed && "Keluar"}
                </Link>
            </div>
        </aside>
    );
}
