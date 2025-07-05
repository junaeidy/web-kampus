import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "@/Components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";

export default function Index({ sections = [] }) {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);

    const openDeleteModal = (section) => {
        setSectionToDelete(section);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!sectionToDelete) return;

        router.delete(route("admin.home.sections.destroy", sectionToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Section berhasil dihapus.");
                setSectionToDelete(null);
                setDeleteModalOpen(false);
            },
            onError: (errors) => {
                toast.error("Gagal menghapus section.");
                console.error("Delete error:", errors);
                setDeleteModalOpen(false);
            },
        });
    };

    return (
        <>
        <AuthenticatedLayout header="Manajemen Home Section">
            <Head title="Manajemen Home Section" />

            <div className="max-w-6xl mx-auto mt-6 bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Daftar Home Section</h2>
                    <Link
                        href={route("admin.home.sections.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                    >
                        Tambah Section
                    </Link>
                </div>

                {sections.length === 0 ? (
                    <p className="text-center text-gray-600 py-4">Belum ada bagian beranda yang ditambahkan.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Tipe</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Urutan</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Konten Ganda</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sections.sort((a, b) => a.order - b.order).map((section) => (
                                    <tr key={section.id}>
                                        <td className="px-4 py-2 capitalize">{section.section_type.replace(/_/g, ' ')}</td>
                                        <td className="px-4 py-2">{section.order}</td>
                                        <td className="px-4 py-2">{section.multiple_content ? 'Ya' : 'Tidak'}</td>
                                        <td className="px-4 py-2 flex gap-2 items-center">
                                            <Link
                                                href={route("admin.home.sections.edit", section.id)}
                                                className="text-blue-600 hover:text-blue-800 relative group"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                                    Edit
                                                </span>
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(section)}
                                                className="text-red-600 hover:text-red-800 relative group"
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
                )}
            </div>

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                itemName={sectionToDelete?.section_type ? sectionToDelete.section_type.replace(/_/g, ' ') : "data"}
            />
        </AuthenticatedLayout>
    </>
    );
}
