import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function SortableNavigationItem({
    nav,
    onEdit,
    onDelete,
    children,
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: nav.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const hasChildren = nav.children && nav.children.length > 0;

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="bg-gray-50 p-3 rounded-md shadow-sm flex flex-col"
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <button
                        {...listeners}
                        className="mr-2 cursor-grab p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Drag handle"
                    >
                        ☰
                    </button>

                    {hasChildren && (
                        <button
                            onClick={toggleCollapse}
                            className="mr-2 p-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={
                                isCollapsed
                                    ? "Expand children"
                                    : "Collapse children"
                            }
                        >
                            {isCollapsed ? (
                                <ChevronRight size={18} />
                            ) : (
                                <ChevronDown size={18} />
                            )}
                        </button>
                    )}
                    <span className="font-medium text-gray-700">
                        {nav.label}
                    </span>
                    {nav.page && (
                        <span className="ml-2 text-sm text-gray-500">
                            ({nav.page.title})
                        </span>
                    )}
                    {nav.url && !nav.page && (
                        <span className="ml-2 text-sm text-gray-500">
                            ({nav.url})
                        </span>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={onEdit}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-red-600 hover:text-red-800 p-1 rounded-md"
                    >
                        Hapus
                    </button>
                </div>
            </div>

            <div
                className={`
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? "max-h-0 overflow-hidden" : "max-h-screen"}
                `}
            >
                {children}
            </div>
        </li>
    );
}
