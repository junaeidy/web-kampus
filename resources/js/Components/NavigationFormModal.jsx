import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function NavigationFormModal({ isOpen, onClose, navigation, pages, navigations }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        label: '',
        url: '',
        page_id: '',
        parent_id: '',
    });

    useEffect(() => {
        if (navigation) {
            setData({
                label: navigation.label || '',
                url: navigation.url || '',
                page_id: navigation.page_id ? String(navigation.page_id) : '',
                parent_id: navigation.parent_id ? String(navigation.parent_id) : '',
            });
        } else {
            reset();
        }
    }, [navigation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = navigation ? put : post;
        const routeName = navigation ? route('admin.navigations.update', navigation.id) : route('admin.navigations.store');

        const cleanedData = { 
            ...data,
            page_id: data.page_id === '' ? null : data.page_id,
            parent_id: data.parent_id === '' ? null : data.parent_id,
        };
        
        if (navigation) {
            console.log('Navigation ID:', navigation.id);
        }

        method(routeName, {
            ...cleanedData,
            onSuccess: () => {
                toast.success(`Navigasi berhasil ${navigation ? 'diperbarui' : 'ditambahkan'}`);
                onClose();
            },
            onError: (errors) => {
                console.error('Validation Errors:', errors);
                toast.error('Terjadi kesalahan. Mohon periksa kembali inputan Anda.');
            },
        });
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-semibold mb-4">
                                    {navigation ? 'Edit Navigasi' : 'Tambah Navigasi'}
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Label</label>
                                        <input
                                            type="text"
                                            value={data.label}
                                            onChange={(e) => setData('label', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.label && <p className="text-sm text-red-500 mt-1">{errors.label}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Halaman (Opsional)</label>
                                        <select
                                            value={data.page_id}
                                            onChange={(e) => setData('page_id', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">-- Pilih Halaman --</option>
                                            {pages.map((page) => (
                                                <option key={page.id} value={String(page.id)}>
                                                    {page.title}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.page_id && <p className="text-sm text-red-500 mt-1">{errors.page_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">URL (Opsional)</label>
                                        <input
                                            type="text"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                        {errors.url && <p className="text-sm text-red-500 mt-1">{errors.url}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Parent Menu (Opsional)</label>
                                        <select
                                            value={data.parent_id}
                                            onChange={(e) => setData('parent_id', e.target.value)}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">-- Tidak Ada --</option>
                                            {navigations
                                                .filter((n) => !navigation || n.id !== navigation.id)
                                                .map((nav) => (
                                                    <option key={nav.id} value={String(nav.id)}>
                                                        {nav.label}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
