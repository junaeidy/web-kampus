import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function LecturerIndex() {
    const { lecturers, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.lecturers.index"),
            { search },
            { preserveState: true }
        );
    };

    const confirmDelete = (item) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        router.delete(route("admin.lecturers.destroy", selectedItem.id), {
            onSuccess: () => toast.success("Dosen berhasil dihapus"),
            onError: () => toast.error("Gagal menghapus dosen"),
        });
    };

    return (
        <AuthenticatedLayout header="Manajemen Dosen">
            <Head title="Manajemen Dosen" />

            <div className="bg-white shadow rounded-lg p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Daftar Dosen
                    </h1>
                    <Link
                        href={route("admin.lecturers.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        + Tambah Dosen
                    </Link>
                </div>

                {/* Form Pencarian */}
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari dosen..."
                        className="w-full md:w-1/3 border-gray-300 rounded shadow-sm"
                    />
                </form>

                {/* Tabel Dosen */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm">
                                <th className="px-4 py-2 border">No</th>
                                <th className="px-4 py-2 border">Foto</th>
                                <th className="px-4 py-2 border text-left">
                                    Nama
                                </th>
                                <th className="px-4 py-2 border text-left">
                                    Jabatan
                                </th>
                                <th className="px-4 py-2 border text-left">
                                    Fakultas
                                </th>
                                <th className="px-4 py-2 border text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecturers.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Tidak ada data dosen.
                                    </td>
                                </tr>
                            ) : (
                                lecturers.data.map((lecturer, index) => (
                                    <tr
                                        key={lecturer.id}
                                        className="text-sm text-gray-800 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 border text-center">
                                            {lecturers.from + index}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {lecturer.photo_path ? (
                                                <img
                                                    src={`/storage/${lecturer.photo_path}`}
                                                    alt={lecturer.name}
                                                    className="h-10 w-10 object-cover rounded-full mx-auto"
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {lecturer.name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {lecturer.position}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {lecturer.faculty?.name || "-"}
                                        </td>
                                        <td className="px-4 py-2 border text-center space-x-2">
                                            <Link
                                                href={route(
                                                    "admin.lecturers.edit",
                                                    lecturer.id
                                                )}
                                                className="inline-flex items-center justify-center text-blue-500 hover:text-blue-600 relative group"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                    Edit
                                                </span>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    confirmDelete(lecturer)
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
                {lecturers.links.length > 1 && (
                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                        <div>
                            Menampilkan {lecturers.from} - {lecturers.to} dari{" "}
                            {lecturers.total} data
                        </div>
                        <div className="flex gap-1">
                            {lecturers.links.map((link, index) => (
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
