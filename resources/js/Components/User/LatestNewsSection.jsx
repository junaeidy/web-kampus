import React from "react";
import { Link } from "@inertiajs/react";
import { CalendarDays } from "lucide-react";

function stripHtmlAndLimit(text, wordLimit = 30) {
    if (!text) return "";
    const stripped = text.replace(/<\/?[^>]+(>|$)/g, "");
    const words = stripped.trim().split(/\s+/);
    return (
        words.slice(0, wordLimit).join(" ") +
        (words.length > wordLimit ? "..." : "")
    );
}

export default function LatestNewsSection({ news }) {
    const defaultNews = [
        {
            id: 1,
            title: "Cara Efektif Belajar Online",
            date: "Januari 25, 2023",
            img: "/images/news-1.jpg",
            description:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            url: "#",
        },
        {
            id: 2,
            title: "Tips Cepat Menguasai Bahasa Asing",
            date: "Januari 10, 2023",
            img: "/images/news-2.jpg",
            description:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            url: "#",
        },
        {
            id: 3,
            title: "Seminar Kepuasan 15 Hari",
            date: "Januari 05, 2023",
            img: "/images/news-3.jpg",
            description:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            url: "#",
        },
    ];

    const newsData = news && news.length > 0 ? news : defaultNews;

    return (
        <section className="bg-section-bg py-12 sm:py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-2 sm:mb-3">
                        Berita Terbaru
                    </h2>
                    <div className="h-1 w-16 sm:w-20 bg-custom-blue mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-sm sm:text-base md:text-lg">
                        Berbagai variasi berita dan artikel tersedia untuk Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {newsData.map((item, index) => (
                        <div
                            key={item.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
                        >
                            <div className="w-full relative pt-[56.25%] overflow-hidden">
                                <img
                                    src={item.img || "/images/news-default.jpg"}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-3 sm:p-4">
                                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1.5 sm:mb-2"> 
                                    <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-custom-blue" />
                                    {item.date}
                                </div>

                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2 leading-snug">
                                    <Link
                                        href={item.url || "#"}
                                        className="hover:text-custom-blue transition-colors duration-200"
                                    >
                                        {item.title}
                                    </Link>
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                                    {stripHtmlAndLimit(item.content || item.description, 20)}
                                </p>

                                <Link
                                    href={item.url || "#"}
                                    className="inline-flex items-center text-custom-blue font-semibold hover:underline text-xs sm:text-sm"
                                >
                                    Baca Selengkapnya
                                    <svg
                                        className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 sm:mt-10 text-center"> 
                    <Link
                        href={route("public.news.index")}
                        className="inline-block bg-custom-blue text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base" // Sesuaikan padding & font size tombol
                    >
                        Lihat Semua Berita
                    </Link>
                </div>
            </div>
        </section>
    );
}
