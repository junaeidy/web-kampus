import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function PublicPage() {
    const { page } = usePage().props;

    return (
        <div className="min-h-screen bg-white px-6 py-12 max-w-4xl mx-auto">
            <Head title={page.title} />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{page.title}</h1>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </div>
    );
}
