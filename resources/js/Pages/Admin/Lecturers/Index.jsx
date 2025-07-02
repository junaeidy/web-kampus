import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";

export default function Index() {
    const { lecturers, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.lecturers.index"), { search }, { preserveState: true });
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

            <div className="bg-white shadow rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Dosen</h1>
                    <Link
                        href={route("admin.lecturers.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Tambah Dosen
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari dosen..."
                        className="border px-3 py-2 rounded w-full max-w-sm"
                    />
                    <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">
                        Cari
                    </button>
                </form>

                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b">No</th>
                                <th className="p-3 border-b">Foto</th>
                                <th className="p-3 border-b">Nama</th>
                                <th className="p-3 border-b">Jabatan</th>
                                <th className="p-3 border-b">Fakultas</th>
                                <th className="p-3 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecturers.data.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}
                            {lecturers.data.map((lecturer, index) => (
                                <tr key={lecturer.id} className="border-t">
                                    <td className="p-3">{lecturers.from + index}</td>
                                    <td className="p-3">
                                        {lecturer.photo_path ? (
                                            <img
                                                src={`/storage/${lecturer.photo_path}`}
                                                alt={lecturer.name}
                                                className="h-10 w-10 object-cover rounded-full"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">-</span>
                                        )}
                                    </td>
                                    <td className="p-3">{lecturer.name}</td>
                                    <td className="p-3">{lecturer.position}</td>
                                    <td className="p-3">{lecturer.faculty?.name || "-"}</td>
                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={route("admin.lecturers.edit", lecturer.id)}
                                            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => confirmDelete(lecturer)}
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
                        Menampilkan {lecturers.from} - {lecturers.to} dari {lecturers.total} data
                    </div>
                    <div className="flex gap-1">
                        {lecturers.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || ""}
                                className={`px-3 py-1 rounded ${link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
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
    );
}
