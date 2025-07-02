import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import toast from "react-hot-toast";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function FacultyIndex() {
    const { faculties, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.faculties.index"),
            { search },
            { preserveState: true }
        );
    };

    const confirmDelete = (item) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        router.delete(route("admin.faculties.destroy", selectedItem.id), {
            onSuccess: () => toast.success("Fakultas berhasil dihapus"),
            onError: () => toast.error("Gagal menghapus fakultas"),
        });
    };

    return (
        <AuthenticatedLayout header="Manajemen Fakultas">
            <Head title="Manajemen Fakultas" />

            <div className="bg-white shadow rounded-lg p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Daftar Fakultas
                    </h1>
                    <Link
                        href={route("admin.faculties.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        + Tambah Fakultas
                    </Link>
                </div>

                {/* Form Search */}
                <form onSubmit={handleSearch} className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari fakultas..."
                        className="w-full md:w-1/3 border-gray-300 rounded shadow-sm"
                    />
                </form>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm">
                                <th className="px-4 py-2 border">No</th>
                                <th className="px-4 py-2 border">Logo</th>
                                <th className="px-4 py-2 border text-left">
                                    Nama
                                </th>
                                <th className="px-4 py-2 border text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada data fakultas.
                                    </td>
                                </tr>
                            ) : (
                                faculties.data.map((faculty, index) => (
                                    <tr
                                        key={faculty.id}
                                        className="text-sm text-gray-800 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 border text-center">
                                            {faculties.from + index}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {faculty.logo_path ? (
                                                <img
                                                    src={`/storage/${faculty.logo_path}`}
                                                    alt={faculty.name}
                                                    className="h-10 mx-auto object-contain"
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {faculty.name}
                                        </td>
                                        <td className="px-4 py-2 border text-center space-x-2">
                                            <Link
                                                href={route(
                                                    "admin.faculties.edit",
                                                    faculty.id
                                                )}
                                                className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 relative group"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                    Edit
                                                </span>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirmDelete(faculty)
                                                }
                                                className="inline-flex items-center justify-center text-red-500 hover:text-red-700 relative group"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
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

                {/* Pagination */}
                {faculties.links.length > 1 && (
                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                        <div>
                            Menampilkan {faculties.from} - {faculties.to} dari{" "}
                            {faculties.total} data
                        </div>
                        <div className="flex gap-1">
                            {faculties.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.get(link.url)
                                    }
                                    className={`px-3 py-1 rounded ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ConfirmDeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                itemName={selectedItem?.name}
            />
        </AuthenticatedLayout>
    );
}
