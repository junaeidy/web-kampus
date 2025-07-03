import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function NewsShow() {
    const { news } = usePage().props;

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <Head title={news.title} />
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

            {news.thumbnail_path && (
                <img
                    src={`/storage/${news.thumbnail_path}`}
                    alt={news.title}
                    className="w-full max-h-96 object-cover mb-6 rounded"
                />
            )}

            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: news.content }}
            />
        </div>
    );
}
