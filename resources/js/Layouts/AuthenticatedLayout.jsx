import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Dropdown from "@/Components/Dropdown";

import {
    Bars3Icon,
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`relative z-40 ${
                    isCollapsed ? "w-20" : "w-64"
                } transition-all duration-200 ease-in-out flex-shrink-0`}
            >
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isCollapsed={isCollapsed}
                />
            </div>

            {/* Overlay for mobile */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden transition-opacity duration-300 ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            ></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden max-h-screen">
                <header className="flex justify-between items-center bg-white border-b border-gray-200 px-4 py-3 shadow-sm z-20 flex-shrink-0">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:inline-flex text-gray-500 hover:text-gray-700"
                        aria-label="Toggle collapse"
                    >
                        {isCollapsed ? (
                            <ChevronDoubleRightIcon className="w-5 h-5" />
                        ) : (
                            <ChevronDoubleLeftIcon className="w-5 h-5" />
                        )}
                    </button>

                    {/* Toggle Sidebar Button (mobile) */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-500 focus:outline-none"
                        aria-label={
                            sidebarOpen ? "Close sidebar" : "Open sidebar"
                        }
                    >
                        {sidebarOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>

                    {/* Page Title */}
                    <div className="flex items-center flex-1 ml-4 md:ml-0">
                        <h1 className="text-lg font-semibold text-gray-800">
                            {header || "Dashboard"}
                        </h1>
                    </div>

                    {/* Search + Icons + Profile */}
                    <div className="flex items-center space-x-4">
                        {/* User Dropdown */}
                        <div className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
                            <img
                                className="h-8 w-8 rounded-full object-cover mr-2"
                                src={`https://ui-avatars.com/api/?name=${user.name}&color=7F9CF5&background=EBF4FF`}
                                alt={user.name}
                            />
                            {user.name}
                        </div>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
