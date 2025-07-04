import React from "react";

export default function AboutSection({ data }) {
    const content = data.contents?.[0];

    if (!content) return null;

    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="lg:pr-8 max-w-full lg:max-w-xl mx-auto lg:mx-0">
                        <span className="inline-block bg-custom-blue text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            Tentang Kami
                        </span>
                        <h2 className="text-4xl font-bold text-gray-800 leading-tight mb-6">
                            {content.headline || "Judul default"}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            {content.description || "Deskripsi tidak tersedia."}
                        </p>
                    </div>

                    <div className="flex justify-center items-center">
                        <img
                            src={`/storage/${content.image}`}
                            alt="Gambar Kampus"
                            className="w-full h-auto object-cover rounded-lg shadow-md max-h-[450px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
