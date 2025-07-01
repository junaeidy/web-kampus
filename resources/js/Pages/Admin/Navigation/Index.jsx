import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import NavigationFormModal from '@/Components/NavigationFormModal';

export default function NavigationIndex() {
    const { navigations = [], pages = [] } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNav, setSelectedNav] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const openModal = (nav = null) => {
        setSelectedNav(nav);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNav(null);
        setModalOpen(false);
    };

    const handleDelete = () => {
        router.delete(route('admin.navigations.destroy', deleteId), {
            onSuccess: () => {
                toast.success('Navigasi berhasil dihapus');
                setDeleteId(null);
            },
            onError: () => toast.error('Gagal menghapus navigasi'),
        });
    };

    return (
        <AuthenticatedLayout header="Manajemen Navigasi">
            <Head title="Navigasi" />

            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Daftar Navigasi</h2>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                        + Tambah Navigasi
                    </button>
                </div>

                <ul className="space-y-2">
                    {navigations.map(nav => (
                        <li key={nav.id} className="border rounded p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <strong>{nav.label}</strong>
                                    <div className="text-sm text-gray-500">
                                        {nav.page ? `Halaman: ${nav.page.title}` : `URL: ${nav.url}`}
                                    </div>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => openModal(nav)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(nav.id)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            {nav.children && nav.children.length > 0 && (
                                <ul className="mt-2 pl-4 border-l space-y-1">
                                    {nav.children.map(sub => (
                                        <li key={sub.id} className="flex justify-between items-center text-sm">
                                            <div>
                                                {sub.label} - {sub.page ? `Halaman: ${sub.page.title}` : `URL: ${sub.url}`}
                                            </div>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => openModal(sub)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(sub.id)}
                                                    className="text-red-400 hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <ConfirmDeleteModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                itemName="navigasi"
            />

            <NavigationFormModal
                isOpen={modalOpen}
                onClose={closeModal}
                navigation={selectedNav}
                pages={pages}
                navigations={navigations}
            />
        </AuthenticatedLayout>
    );
}
