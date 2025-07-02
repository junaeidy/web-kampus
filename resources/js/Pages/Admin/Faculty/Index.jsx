import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";

export default function Index() {
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
            onSuccess: () => {
                toast.success("Fakultas berhasil dihapus");
            },
            onError: () => {
                toast.error("Gagal menghapus fakultas");
            },
        });
    };

    return (
        <>
            <AuthenticatedLayout header="Manajemen Fakultas">
                <Head title="Manajemen Fakultas" />
                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Fakultas</h1>
                        <Link
                            href={route("admin.faculties.create")}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + Tambah Fakultas
                        </Link>
                    </div>

                    {/* Form Pencarian */}
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari fakultas..."
                            className="border px-3 py-2 rounded w-full max-w-sm"
                        />
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Tabel Fakultas */}
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 border-b">No</th>
                                    <th className="p-3 border-b">Logo</th>
                                    <th className="p-3 border-b">Nama</th>
                                    <th className="p-3 border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faculties.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-4 text-center text-gray-500"
                                        >
                                            Tidak ada data.
                                        </td>
                                    </tr>
                                )}
                                {faculties.data.map((faculty, index) => (
                                    <tr key={faculty.id} className="border-t">
                                        <td className="p-3">
                                            {faculties.from + index}
                                        </td>
                                        <td className="p-3">
                                            {faculty.logo_path ? (
                                                <img
                                                    src={`/storage/${faculty.logo_path}`}
                                                    alt={faculty.name}
                                                    className="h-10 object-contain"
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3">{faculty.name}</td>
                                        <td className="p-3 flex gap-2">
                                            <Link
                                                href={route(
                                                    "admin.faculties.edit",
                                                    faculty.id
                                                )}
                                                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirmDelete(faculty)
                                                }
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                            Menampilkan {faculties.from} - {faculties.to} dari{" "}
                            {faculties.total} data
                        </div>
                        <div className="flex gap-1">
                            {faculties.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || ""}
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
                </div>

                <ConfirmDeleteModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={handleDelete}
                    itemName={selectedItem?.name}
                />
            </AuthenticatedLayout>
        </>
    );
}
