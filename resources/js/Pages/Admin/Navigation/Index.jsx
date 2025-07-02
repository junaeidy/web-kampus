import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import NavigationFormModal from '@/Components/NavigationFormModal';
import SortableNavigationItem from '@/Components/SortableNavigationItem';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';

export default function NavigationIndex() {
    const { navigations: initialNavigations, pages = [] } = usePage().props;
    const [items, setItems] = useState(initialNavigations);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNav, setSelectedNav] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [modalKey, setModalKey] = useState(0);

    useEffect(() => {
        setItems(initialNavigations);
    }, [initialNavigations]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const openModal = (nav = null) => {
        setSelectedNav(nav);
        setModalOpen(true);
        if (!nav) {
            setModalKey(prevKey => prevKey + 1);
        }
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
            onError: () => {
                toast.error('Gagal menghapus navigasi');
                setDeleteId(null);
            },
        });
    };

    const flattenNavigation = (items, parentId = null) => {
        return items.flatMap((item, index) => {
            const flatItem = {
                id: item.id,
                order: index,
                parent_id: parentId,
            };
            const children = item.children ? flattenNavigation(item.children, item.id) : [];
            return [flatItem, ...children];
        });
    };

    const findParent = (items, childId) => {
        for (const item of items) {
            if (item.children?.some(child => child.id === childId)) {
                return item;
            }
        }
        return null;
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const allItems = items.flatMap(item => [
            item,
            ...(item.children || []),
        ]);

        const activeItem = allItems.find(i => i.id === active.id);
        const overItem = allItems.find(i => i.id === over.id);

        if (!activeItem || !overItem) return;

        const activeParent = findParent(items, activeItem.id);
        const overParent = findParent(items, overItem.id);

        const isSameParent = activeParent?.id === overParent?.id;

        if (!isSameParent) return;

        const parent = activeParent || { children: items };
        const siblings = parent.children || items;

        const oldIndex = siblings.findIndex(i => i.id === activeItem.id);
        const newIndex = siblings.findIndex(i => i.id === overItem.id);

        const newSiblings = arrayMove(siblings, oldIndex, newIndex);

        let newItems;
        if (!activeParent) {
            newItems = newSiblings;
        } else {
            newItems = items.map(i => {
                if (i.id === parent.id) {
                    return { ...i, children: newSiblings };
                }
                return i;
            });
        }
        setItems(newItems);

        const payload = flattenNavigation(newItems);
        router.post(route('admin.navigations.reorder'), {
            items: payload,
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Urutan navigasi diperbarui'),
            onError: () => toast.error('Gagal memperbarui urutan navigasi'),
        });
    };


    const renderChildren = (children) => (
        <SortableContext
            items={children.map((child) => child.id)}
            strategy={verticalListSortingStrategy}
        >
            <ul className="pl-6 mt-2 space-y-1 border-l">
                {children.map((child) => (
                    <SortableNavigationItem
                        key={child.id}
                        nav={child}
                        onEdit={() => openModal(child)}
                        onDelete={() => setDeleteId(child.id)}
                    />
                ))}
            </ul>
        </SortableContext>
    );

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

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={items.map((nav) => nav.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ul className="space-y-2">
                            {items.map((nav) => (
                                <SortableNavigationItem
                                    key={nav.id}
                                    nav={nav}
                                    onEdit={() => openModal(nav)}
                                    onDelete={() => setDeleteId(nav.id)}
                                >
                                    {nav.children && nav.children.length > 0 && renderChildren(nav.children)}
                                </SortableNavigationItem>
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>
            </div>

            <ConfirmDeleteModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                itemName="navigasi"
            />

            <NavigationFormModal
                key={modalKey}
                isOpen={modalOpen}
                onClose={closeModal}
                navigation={selectedNav}
                pages={pages}
                navigations={initialNavigations}
            />
        </AuthenticatedLayout>
    );
}
