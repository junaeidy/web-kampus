import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            title: "Program Studi Pendidikan Matematika Jalani Asesmen Lapangan",
            date: "Juni 14, 2025",
            img: "/images/news-1.jpg",
            description:
                "Program Studi Pendidikan Matematika STKIP PGRI Pacitan menerima tim asesor dari Lembaga Akreditasi Mandiri Kependidikan...",
            url: "#",
        },
        {
            id: 2,
            title: "Tips Cepat Menguasai Bahasa Asing",
            date: "Januari 10, 2023",
            img: "/images/news-2.jpg",
            description:
                "Belajar bahasa asing kini bisa lebih cepat dengan metode efektif berbasis pengalaman langsung...",
            url: "#",
        },
        {
            id: 3,
            title: "Seminar Kepuasan 15 Hari",
            date: "Januari 05, 2023",
            img: "/images/news-3.jpg",
            description:
                "Seminar tentang kepuasan belajar daring akan berlangsung 15 hari penuh dengan berbagai narasumber...",
            url: "#",
        },
    ];

    const newsData = news && news.length > 0 ? news : defaultNews;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % newsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? newsData.length - 1 : prev - 1
        );
    };

    return (
        <section className="bg-section-bg py-12 sm:py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={newsData[currentIndex].id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-10"
                        >
                            {/* Text Content */}
                            <div className="order-2 md:order-1">
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <CalendarDays className="w-5 h-5 mr-2 text-custom-blue" />
                                    {newsData[currentIndex].date}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 leading-snug">
                                    {newsData[currentIndex].title}
                                </h2>
                                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                    {stripHtmlAndLimit(
                                        newsData[currentIndex].content,
                                        40
                                    )}
                                </p>
                                <Link
                                    href={newsData[currentIndex].url || "#"}
                                    className="inline-block bg-custom-blue text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-800 transition"
                                >
                                    Read More
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="order-1 md:order-2 w-full h-full rounded-lg overflow-hidden shadow">
                                <img
                                    src={
                                        newsData[currentIndex].img ||
                                        "/images/news-default.jpg"
                                    }
                                    alt={newsData[currentIndex].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex gap-3 px-2">
                        
                    </div>

                    {/* Indicator Dots */}
                    <div className="flex justify-center mt-6">
                        {newsData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full mx-1 transition ${
                                    index === currentIndex
                                        ? "bg-custom-blue scale-110"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
