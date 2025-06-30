import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Dropdown from "@/Components/Dropdown";

import {
    Bars3Icon,
    XMarkIcon,
    BellIcon,
    ChatBubbleLeftRightIcon,
    EllipsisHorizontalCircleIcon,
    MagnifyingGlassIcon,
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
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isCollapsed={isCollapsed}
            />

            {/* Overlay for mobile */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black bg-opacity-25 z-20 md:hidden transition-opacity duration-300 ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            ></div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center bg-white border-b border-gray-200 px-4 py-3 shadow-sm z-20">
                    {/* Sidebar Collapse Button (desktop) */}
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
                        <div className="relative hidden sm:block w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                            <BellIcon className="w-6 h-6" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 hidden sm:block">
                            <EllipsisHorizontalCircleIcon className="w-6 h-6" />
                        </button>

                        {/* User Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover mr-2"
                                        src={`https://ui-avatars.com/api/?name=${user.name}&color=7F9CF5&background=EBF4FF`}
                                        alt={user.name}
                                    />
                                    {user.name}
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
