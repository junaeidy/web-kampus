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
            <div
                className="max-w-full md:max-w-xl mx-auto md:mx-0 text-center md:text-left"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                <span className="inline-block bg-custom-blue text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 md:mb-4">
                    Tentang Kami
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight mb-4 md:mb-6">
                    {content.headline || "Judul default"}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                    {content.description || "Deskripsi tidak tersedia."}
                </p>
            </div>

            <div
                className="flex justify-center items-center"
                data-aos="fade-left"
                data-aos-delay="300"
            >
                <img
                    src={`/storage/${content.image}`}
                    alt="Gambar Kampus"
                    className="w-full h-auto object-cover rounded-lg shadow-md max-w-sm sm:max-w-md md:max-w-full mx-auto"
                />
            </div>
        </div>
    );

    return (
        <section className="bg-white py-12 sm:py-16 px-4 overflow-x-hidden">
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
                        className="pb-10" 
                    >
                        {contents.map((content, index) => (
                            <SwiperSlide key={index}>
                                <div className="py-4 md:py-0">
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
