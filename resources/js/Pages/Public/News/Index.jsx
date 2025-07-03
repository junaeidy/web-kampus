import React from 'react';
import { Link, Head, usePage } from '@inertiajs/react';

export default function NewsIndex() {
    const { news } = usePage().props;

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <Head title="Berita" />
            <h1 className="text-3xl font-bold mb-6">Berita Terbaru</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.data.map((item) => (
                    <div key={item.id} className="border rounded shadow-sm hover:shadow-md transition overflow-hidden">
                        {item.thumbnail_path && (
                            <img
                                src={`/storage/${item.thumbnail_path}`}
                                alt={item.title}
                                className="w-full h-40 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                            <Link
                                href={route('public.news.show', item.slug)}
                                className="text-blue-600 text-sm hover:underline"
                            >
                                Baca selengkapnya →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2 text-sm text-gray-600">
                {news.links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.url || ""}
                        className={`px-3 py-1 rounded ${
                            link.active
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
