import React from "react";

export default function CallToActionSection({ data }) {
    return (
        <section className="bg-custom-green py-12 sm:py-16 md:py-20 px-4 text-white text-center flex items-center justify-center">
            <div className="container mx-auto max-w-4xl">
                <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6"
                    data-aos="fade-up"
                    data-aos-delay="0"
                >
                    {data?.title ||
                        "Mulai Belajar Hari Ini di STAI Al-Hikmah Pariangan"}
                </h2>
                <p
                    className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 opacity-90" 
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {data?.description ||
                        "Bergabunglah dengan ribuan mahasiswa lainnya dan kembangkan potensi terbaik Anda bersama kami."}
                </p>
                {data?.cta_link && (
                    <a
                        target="_blank"
                        href={data.cta_link}
                        className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-base sm:text-lg // Sesuaikan padding & font size tombol
                                   bg-white text-custom-green hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        {data.button_text || "Gabung Sekarang"}
                    </a>
                )}
            </div>
        </section>
    );
}
