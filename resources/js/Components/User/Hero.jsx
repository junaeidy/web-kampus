import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroSection({ data }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <section className="relative w-full overflow-hidden pt-[2px] bg-section-bg">
            {/* HERO */}
            <div className="container mx-auto px-0 sm:px-4 md:px-8">
                <div
                    className="
                        relative w-full shadow-xl overflow-hidden
                        aspect-[1190/500] sm:aspect-[1190/400]
                    "
                >
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={1000}
                        slidesPerView={1}
                        className="h-full w-full"
                    >
                        {data.map((slide, index) => {
                            const hasText = slide.title || slide.description;

                            return (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-full">
                                        {/* Background image */}
                                        <div
                                            className="absolute inset-0 bg-center bg-cover"
                                            style={{
                                                backgroundImage: `url('/storage/${slide.image}')`,
                                            }}
                                        >
                                            {hasText && (
                                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 z-10 flex flex-col justify-center items-start text-white px-4 sm:px-8 py-6">
                                            {slide.title && (
                                                <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold leading-tight mb-2 sm:mb-4 drop-shadow-lg">
                                                    {slide.title}
                                                </h1>
                                            )}
                                            {slide.description && (
                                                <p className="text-xs sm:text-base md:text-lg max-w-lg md:max-w-2xl mb-3 sm:mb-6 drop-shadow text-left">
                                                    {slide.description}
                                                </p>
                                            )}
                                            {slide.cta_link && (
                                                <a
                                                    href={slide.cta_link}
                                                    className="inline-block bg-custom-blue hover:bg-blue-700 transition text-white font-semibold py-1.5 px-4 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded-lg shadow-lg text-xs sm:text-sm md:text-base"
                                                >
                                                    Pelajari Lebih Lanjut
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>

            {/* SECTION AJAKAN */}
            <div className="container mx-auto px-0 sm:px-4 md:px-8 relative -mt-2 sm:-mt-6 z-10">
                <div className="bg-[#002663] text-white flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4 rounded-b-[25px] sm:rounded-b-[40px] shadow-md text-center">
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold">
                        Gabung Bersama Kami !!
                    </h2>
                    <a
                        href="https://pmb.staialhikmahpariangan.ac.id/"
                        target="_blank"
                        className="bg-[#FFDA00] text-[#002663] font-bold py-1.5 sm:py-2 px-4 sm:px-5 rounded-full shadow text-xs sm:text-sm md:text-base hover:bg-yellow-400 transition"
                    >
                        PMB KLIK DISINI »
                    </a>
                </div>
            </div>
        </section>
    );
}
