import React, { useState } from "react";
import { Link, Head, usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/User/Navbar";
import Footer from "@/Components/User/Footer";
import HeroSectionWithContent from "@/Components/User/HeroSectionWithContent";
import ScrollToTopButton from "@/Components/ScrollToTopButton";
import { CalendarDays, Search } from "lucide-react";

export default function NewsIndex({
    pages,
    navigations,
    faculties,
    recentNews,
    search,
}) {
    const { news } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("public.news.index"),
            { search: searchQuery },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const defaultRecentNews = [
        {
            id: 1,
            title: "Ini Akan Menghemat Waktu dan Uang Anda",
            date: "2023-11-05",
            img: "/images/recent-news-1.jpg",
            url: "#",
        },
        {
            id: 2,
            title: "Cara Efektif Belajar Kursus Online",
            date: "2023-11-10",
            img: "/images/recent-news-2.jpg",
            url: "#",
        },
        {
            id: 3,
            title: "Strategi Menguasai Bahasa Asing",
            date: "2023-11-15",
            img: "/images/recent-news-3.jpg",
            url: "#",
        },
    ];

    const displayRecentNews =
        recentNews && recentNews.length > 0 ? recentNews : defaultRecentNews;

    return (
        <div className="min-h-screen flex flex-col">
            <Head title="Berita" />
            <Navbar navigations={navigations} pages={pages} />
            <HeroSectionWithContent />

            <main className="flex-grow bg-section-bg py-16 px-4">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {news.data.length > 0 ? (
                                news.data.map((item, index) => (
                                    <div
                                        key={item.id}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 200}
                                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
                                    >
                                        {item.thumbnail_path && (
                                            <div className="w-full h-48 overflow-hidden">
                                                <img
                                                    src={`/storage/${item.thumbnail_path}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                                <span className="flex items-center">
                                                    <CalendarDays className="w-4 h-4 mr-1 text-custom-blue" />
                                                    {formatDate(
                                                        item.created_at
                                                    )}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                                                <Link
                                                    href={route(
                                                        "public.news.show",
                                                        item.slug
                                                    )}
                                                    className="hover:text-custom-blue transition-colors duration-200"
                                                >
                                                    {item.title}
                                                </Link>
                                            </h3>

                                            <p
                                                className="text-gray-600 text-base mb-6 line-clamp-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            />

                                            <Link
                                                href={route(
                                                    "public.news.show",
                                                    item.slug
                                                )}
                                                className="inline-flex items-center text-custom-blue font-semibold hover:underline transition-colors duration-200"
                                            >
                                                Baca Selengkapnya
                                                <svg
                                                    className="ml-2 w-4 h-4"
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
                                ))
                            ) : (
                                <p className="text-gray-600 text-center col-span-full">
                                    Tidak ada berita terbaru.
                                </p>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2 text-sm text-gray-600">
                            {news.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || ""}
                                    className={`px-4 py-2 rounded-lg font-semibold transition duration-200
                                        ${
                                            link.active
                                                ? "bg-custom-blue text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                        } ${
                                        link.url
                                            ? ""
                                            : "cursor-not-allowed opacity-50"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Kolom Kanan: Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Widget Search */}
                        <div
                            className="bg-white p-6 rounded-lg shadow-md"
                            data-aos="fade-left"
                            data-aos-delay="100"
                        >
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Cari Berita Di Sini
                            </h4>
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Cari..."
                                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-custom-blue"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div
                            className="bg-white p-6 rounded-lg shadow-md"
                            data-aos="fade-left"
                            data-aos-delay="300"
                        >
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Berita Terbaru
                            </h4>
                            <div className="space-y-4">
                                {displayRecentNews.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.url || "#"}
                                        className="flex items-center group"
                                    >
                                        <div className="w-20 h-20 flex-shrink-0 mr-4 overflow-hidden rounded-lg">
                                            <img
                                                src={
                                                    item.img ||
                                                    "/images/recent-news-default.jpg"
                                                }
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div>
                                            <h5 className="text-base font-semibold text-gray-800 group-hover:text-custom-blue transition-colors duration-200">
                                                {item.title}
                                            </h5>
                                            <p className="text-gray-500 text-sm flex items-center mt-1">
                                                <CalendarDays className="w-4 h-4 mr-1" />{" "}
                                                {formatDate(item.date)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer news={recentNews} faculties={faculties} />
            <ScrollToTopButton />
        </div>
    );
}
