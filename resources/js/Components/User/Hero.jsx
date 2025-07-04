import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function HeroSection({ data }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <section className="relative mt-[70px] h-screen w-full">
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                speed={1000}
                slidesPerView={1}
            >
                {data.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-screen w-full bg-center bg-cover relative"
                            style={{ backgroundImage: `url('/storage/${slide.image}')` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                            <div className="relative z-10 h-full flex flex-col justify-center items-start container mx-auto px-4 text-white">
                                {slide.title && (
                                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                )}
                                {slide.description && (
                                    <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow">
                                        {slide.description}
                                    </p>
                                )}
                                {slide.cta_link && (
                                    <a
                                        href={slide.cta_link}
                                        className="inline-block bg-custom-blue hover:bg-blue-700 transition text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
                                    >
                                        Pelajari Lebih Lanjut
                                    </a>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
