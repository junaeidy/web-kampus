import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroSection({ data }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <section className="relative mt-[70px] max-w-full overflow-hidden">
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
                {data.map((slide, index) => {
                    const hasText = slide.title || slide.description;

                    return (
                        <SwiperSlide key={index}>
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <div
                                    className="hidden sm:block absolute inset-0 bg-center bg-cover"
                                    style={{
                                        backgroundImage: `url('/storage/${slide.image}')`,
                                    }}
                                    data-aos="zoom-in"
                                    data-aos-delay="100"
                                >
                                    {hasText && <div className="absolute inset-0 bg-black bg-opacity-50"></div>}
                                </div>

                                <div className="block sm:hidden absolute inset-0 overflow-hidden">
                                    <img
                                        src={`/storage/${slide.image}`}
                                        alt="Slide"
                                        className="h-full w-full object-cover"
                                    />
                                    {hasText && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                    )}
                                </div>

                                <div className="absolute inset-0 z-10 flex flex-col justify-center items-start container mx-auto px-4 text-white">
                                    {slide.title && (
                                        <h1
                                            className="text-3xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg"
                                            data-aos="fade-up"
                                            data-aos-delay="200"
                                        >
                                            {slide.title}
                                        </h1>
                                    )}
                                    {slide.description && (
                                        <p
                                            className="text-base md:text-xl max-w-2xl mb-6 drop-shadow"
                                            data-aos="fade-up"
                                            data-aos-delay="400"
                                        >
                                            {slide.description}
                                        </p>
                                    )}
                                    {slide.cta_link && (
                                        <a
                                            href={slide.cta_link}
                                            className="inline-block bg-custom-blue hover:bg-blue-700 transition text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
                                            data-aos="fade-up"
                                            data-aos-delay="600"
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
        </section>
    );
}
