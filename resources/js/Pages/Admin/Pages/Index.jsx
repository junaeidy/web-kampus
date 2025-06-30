import React, { useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function PageIndex() {
    const { pages } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = () => {
        router.delete(route("admin.pages.destroy", selectedId), {
            onSuccess: () => toast.success("Halaman berhasil dihapus"),
            onError: () => toast.error("Gagal menghapus halaman"),
        });
    };

    return (
        <AuthenticatedLayout header="Manajemen Halaman">
            <Head title="Halaman" />

            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Daftar Halaman
                    </h2>
                    <Link
                        href={route("admin.pages.create")}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                        + Tambah Halaman
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm">
                                <th className="px-4 py-2 border">No</th>
                                <th className="px-4 py-2 border text-left">
                                    Judul
                                </th>
                                <th className="px-4 py-2 border text-left">
                                    Slug
                                </th>
                                <th className="px-4 py-2 border text-center">
                                    Status
                                </th>
                                <th className="px-4 py-2 border text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Belum ada halaman.
                                    </td>
                                </tr>
                            ) : (
                                pages.data.map((page, index) => (
                                    <tr
                                        key={page.id}
                                        className="text-sm text-gray-800 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 border text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {page.title}
                                        </td>
                                        <td className="px-4 py-2 border text-blue-600">
                                            {page.slug}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {page.is_active ? (
                                                <span className="text-green-600 font-semibold">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-semibold">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border text-center space-x-2">
                                            <a
                                                href={route(
                                                    "pages.show",
                                                    page.slug
                                                )}
                                                target="_blank"
                                                className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 relative group"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                                    Lihat
                                                </span>
                                            </a>

                                            <Link
                                                href={route(
                                                    "admin.pages.edit",
                                                    page.id
                                                )}
                                                className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 relative group"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                                    Edit
                                                </span>
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    setSelectedId(page.id);
                                                    setModalOpen(true);
                                                }}
                                                className="inline-flex items-center justify-center text-red-500 hover:text-red-700 relative group"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                                    Hapus
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
                itemName="halaman"
            />
        </AuthenticatedLayout>
    );
}
