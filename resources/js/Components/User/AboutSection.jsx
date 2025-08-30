import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function AboutSection({ data }) {
    const contents = data.contents || [];

    if (contents.length === 0) return null;

    const renderContent = (content, index = 0) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-full overflow-hidden">
            {/* Teks */}
            <div
                className="max-w-full md:max-w-xl mx-auto md:mx-0 text-center md:text-left"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                <span className="inline-block bg-gradient-to-r from-[#002663] to-[#0050d4] text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow mb-3 md:mb-4">
                    Tentang Kami
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight mb-4 md:mb-6">
                    {content.headline || "Judul default"}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                    {content.description || "Deskripsi tidak tersedia."}
                </p>

                {/* Tombol opsional */}
                <a
                    href="#"
                    className="inline-block bg-[#FFDA00] text-[#002663] font-bold px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow hover:bg-yellow-400 transition duration-300 text-xs sm:text-sm md:text-base"
                >
                    Selengkapnya »
                </a>
            </div>

            {/* Gambar */}
            <div
                className="flex justify-center items-center relative"
                data-aos="fade-left"
                data-aos-delay="300"
            >
                <div className="relative">
                    <img
                        src={`/storage/${content.image}`}
                        alt="Gambar Kampus"
                        className="w-full h-auto object-cover rounded-xl shadow-lg max-w-sm sm:max-w-md md:max-w-full mx-auto transform transition duration-700 hover:scale-105"
                    />
                    {/* dekorasi gradient glow */}
                    <div className="absolute -z-10 inset-0 bg-gradient-to-r from-[#002663]/20 to-[#0050d4]/20 rounded-xl blur-2xl"></div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-white py-12 sm:py-20 px-4 overflow-x-hidden relative">
            <div className="max-w-6xl mx-auto">
                {contents.length === 1 ? (
                    renderContent(contents[0])
                ) : (
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={1000}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        slidesPerView={1}
                        className="pb-12"
                    >
                        {contents.map((content, index) => (
                            <SwiperSlide key={index}>
                                <div className="py-6 md:py-0">
                                    {renderContent(content, index)}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}
