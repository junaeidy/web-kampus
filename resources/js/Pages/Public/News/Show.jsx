import React, { useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Navbar from "@/Components/User/Navbar";
import Footer from "@/Components/User/Footer";
import ScrollToTopButton from "@/Components/ScrollToTopButton";
import { CalendarDays } from "lucide-react";
import AOS from 'aos'; 
import 'aos/dist/aos.css';

export default function NewsShow({
    pages,
    navigations,
    faculties,
    recentNews,
}) {
    const { news } = usePage().props;

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 50,
            disable: function() {
                return window.innerWidth <= 768;
            },
        });
        AOS.refresh();
    }, [news]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Head title={news.title} />
            <Navbar navigations={navigations} pages={pages} />

            <section
                className="relative bg-custom-blue text-white flex items-center justify-center overflow-hidden text-center py-16" 
                style={{
                    minHeight: "40vh", 
                    marginTop: "72px",
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?_gl=1*1p82o9c*_ga*MzM0ODA3ODc2LjE3NDk3NzY0NDc.*_ga_8JE65Q40S6*czE3NTE2Nzk4MDYkbzEwJGcxJHQxNzUxNjc5ODI0JGo0MiRsMCRoMA..')",
                        backgroundAttachment: "fixed",
                    }}
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
                </div>

                <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4">
                        {news.title}
                    </h1>
                    <div className="h-1 w-20 sm:w-24 bg-custom-green mx-auto mb-4 sm:mb-6"></div> 
                    <div className="text-sm sm:text-lg flex justify-center items-center gap-1 sm:gap-2"> 
                        <Link
                            href={route("home")}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            Beranda
                        </Link>
                        <span>/</span>
                        <Link
                            href={route("public.news.index")}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            Berita
                        </Link>
                        <span>/</span>
                        <span className="text-custom-green line-clamp-1 sm:line-clamp-none">
                            {news.title.length > 20 
                                ? news.title.substring(0, 20) + "..."
                                : news.title}
                        </span>
                    </div>
                </div>
            </section>

            <main className="flex-grow bg-section-bg py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    {news.thumbnail_path && (
                        <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={`/storage/${news.thumbnail_path}`}
                                alt={news.title}
                                className="w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px]" 
                            />
                        </div>
                    )}

                    <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
                        <span className="flex items-center">
                            <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-custom-blue" />
                            {formatDate(news.created_at)}
                        </span>
                    </div>
                    <div
                        className="prose max-w-none prose-sm sm:prose-base lg:prose-lg text-gray-800 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                    <div className="mt-8 sm:mt-12 text-center">
                        <Link
                            href={route("public.news.index")}
                            className="relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold group overflow-hidden transition-all duration-300 text-sm sm:text-base" 
                        >
                            <span className="absolute inset-0 w-0 bg-custom-blue transition-all duration-300 group-hover:w-full z-0 rounded-lg"></span>
                            <span className="relative z-10 text-custom-blue group-hover:text-white transition-colors duration-300">
                                ← Kembali ke Berita
                            </span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer news={recentNews} faculties={faculties} />
            <ScrollToTopButton />
        </div>
    );
}
