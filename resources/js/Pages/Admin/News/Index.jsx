import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function NewsIndex() {
    const { news, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.news.index"),
            { search },
            { preserveState: true }
        );
    };

    const confirmDelete = (item) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    };

    const handleDelete = () => {
        router.delete(route("admin.news.destroy", selectedItem.id), {
            onSuccess: () => toast.success("Berita berhasil dihapus"),
            onError: () => toast.error("Gagal menghapus berita"),
        });
    };

    return (
        <AuthenticatedLayout header="Manajemen Berita">
            <Head title="Manajemen Berita" />

            <div className="bg-white shadow rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Berita</h1>
                    <Link
                        href={route("admin.news.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Tambah Berita
                    </Link>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari berita..."
                        className="border px-3 py-2 rounded w-full max-w-sm"
                    />
                </form>

                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b">No</th>
                                <th className="p-3 border-b">Thumbnail</th>
                                <th className="p-3 border-b">Judul</th>
                                <th className="p-3 border-b">Tanggal</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}
                            {news.data.map((item, index) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-3">{news.from + index}</td>
                                    <td className="p-3">
                                        {item.thumbnail_path ? (
                                            <img
                                                src={`/storage/${item.thumbnail_path}`}
                                                alt={item.title}
                                                className="h-12 w-20 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3">{item.title}</td>
                                    <td className="px-4 py-2 border">
                                        {new Intl.DateTimeFormat("id-ID", {
                                            dateStyle: "long",
                                            timeStyle: "short",
                                        }).format(new Date(item.created_at))}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {item.is_active ? (
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
                                                "public.news.show",
                                                item.slug
                                            )}
                                            target="_blank"
                                            className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 relative group"
                                        >
                                            <EyeIcon className="w-5 h-5" />
                                            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                Lihat
                                            </span>
                                        </a>

                                        <Link
                                            href={route(
                                                "admin.news.edit",
                                                item.id
                                            )}
                                            className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 relative group"
                                        >
                                            <PencilSquareIcon className="w-5 h-5" />
                                            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                Edit
                                            </span>
                                        </Link>

                                        <button
                                            onClick={() => {
                                                setSelectedId(news.id);
                                                setModalOpen(true);
                                            }}
                                            className="inline-flex items-center justify-center text-red-500 hover:text-red-700 relative group"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                Hapus
                                            </span>
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
                        Menampilkan {news.from} - {news.to} dari {news.total}{" "}
                        data
                    </div>
                    <div className="flex gap-1">
                        {news.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || ""}
                                className={`px-3 py-1 rounded ${
                                    link.active
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
                itemName={selectedItem?.title}
            />
        </AuthenticatedLayout>
    );
}
