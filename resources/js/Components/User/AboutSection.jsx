import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function AboutSection({ data }) {
    const contents = data.contents || [];

    if (contents.length === 0) return null;

    const renderContent = (content, index = 0) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div
                className="lg:pr-8 max-w-full lg:max-w-xl mx-auto lg:mx-0"
                data-aos="fade-right"
                data-aos-delay="100"
            >
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

            <div
                className="flex justify-center items-center"
                data-aos="fade-left"
                data-aos-delay="300"
            >
                <img
                    src={`/storage/${content.image}`}
                    alt="Gambar Kampus"
                    className="w-full h-auto object-cover rounded-lg shadow-md max-h-[450px]"
                />
            </div>
        </div>
    );

    return (
        <section className="bg-white py-16 px-4">
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
                        pagination={{ clickable: true }}
                        slidesPerView={1}
                    >
                        {contents.map((content, index) => (
                            <SwiperSlide key={index}>
                                {renderContent(content, index)}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}
