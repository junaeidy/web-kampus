import React from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {
    Facebook,
    Instagram,
    Link2,
    MapPin,
    Phone,
    Mail,
    ChevronUp,
} from "lucide-react";

export default function Footer({ news = [], faculties = [] }) {
    const defaultNews = [
        {
            id: 1,
            title: "Kegiatan Pengabdian Masyarakat STAI Al-Hikmah 2024",
            date: "Desember 15, 2024",
            img: "/images/news-placeholder1.jpg",
            url: "#",
        },
        {
            id: 2,
            title: "Pembukaan Pendaftaran Mahasiswa Baru Tahun Ajaran 2025/2026",
            date: "Januari 1, 2025",
            img: "/images/news-placeholder2.jpg",
            url: "#",
        },
    ];

    const defaultFaculties = [
        { id: 1, name: "Fakultas Tarbiyah", url: "#" },
        { id: 2, name: "Fakultas Syariah", url: "#" },
        { id: 3, name: "Fakultas Ushuluddin", url: "#" },
    ];

    const currentNews = news.length > 0 ? news : defaultNews;
    const currentFaculties =
        faculties.length > 0 ? faculties : defaultFaculties;

    return (
        <footer className="bg-footer-bg pt-16">
            <div className="container mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Kolom 1: Informasi Kampus */}
                    <div>
                        <div className="flex items-center mb-4">
                            <ApplicationLogo className="h-10 w-10 text-custom-blue" />
                            <span className="ml-2 text-2xl font-bold text-gray-800">
                                STAI Al-Hikmah Pariangan
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm">
                            Sekolah Tinggi Agama Islam Al-Hikmah Pariangan
                            Batusangkar adalah lembaga pendidikan tinggi Islam
                            yang berkomitmen mencetak generasi unggul.
                        </p>
                        <p className="text-gray-600 mb-2 text-sm flex items-start">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                            <span>
                                Jorong Padang Panjang Pariangan No. 17 Kec.
                                Pariangan Kab. Tanah Datar, West Sumatra,
                                Indonesia.
                            </span>
                        </p>
                        <p className="text-gray-600 mb-2 text-sm flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            085379388533
                        </p>
                        <p className="text-gray-600 mb-4 text-sm flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            info@staialhikmahpariangan.ac.id
                        </p>

                        <div className="flex space-x-3">
                            <a
                                href="https://www.facebook.com/staialhikmahpariangan.ac.id/?locale=id_ID"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-custom-blue hover:text-white transition duration-300"
                            >
                                <Facebook className="w-5 h-5 text-gray-600 group-hover:text-white" />
                            </a>
                            <a
                                href="https://www.instagram.com/staialhikmahpariangan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-custom-blue hover:text-white transition duration-300"
                            >
                                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-white" />
                            </a>
                            <a
                                href="https://linktr.ee/staialhikmahpariangan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-custom-blue hover:text-white transition duration-300"
                            >
                                <Link2 className="w-5 h-5 text-gray-600 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Latest News */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Latest News
                        </h3>
                        <div className="space-y-6">
                            {currentNews.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.url || "#"}
                                    className="flex items-center group"
                                >
                                    <div className="w-16 h-16 mr-4 flex-shrink-0">
                                        <img
                                            src={
                                                item.img ||
                                                "/images/news-default.jpg"
                                            }
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-gray-700 group-hover:text-custom-blue transition duration-300 font-semibold text-sm">
                                            {item.title}
                                        </p>
                                        <span className="text-gray-500 text-xs flex items-center">
                                            <i className="far fa-calendar-alt mr-1"></i>{" "}
                                            {item.date}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Kolom 3: Fakultas / Faculty List */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Fakultas
                        </h3>
                        <ul className="space-y-3">
                            {currentFaculties.map((faculty) => (
                                <li key={faculty.id}>
                                    <Link
                                        href={faculty.url || "#"}
                                        className="text-gray-600 hover:text-custom-blue transition duration-300 text-base"
                                    >
                                        {faculty.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 4: Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                            Newsletter
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Berlangganan untuk mendapatkan berita dan informasi
                            terbaru dari kami.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-4"
                        >
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
                            />
                            <button
                                type="submit"
                                className="relative w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold overflow-hidden group transition-all duration-300"
                            >
                                {/* Sliding background */}
                                <span className="absolute inset-0 w-0 bg-custom-blue transition-all duration-300 group-hover:w-full z-0"></span>

                                {/* Teks tetap di atas */}
                                <span className="relative z-10 flex justify-center items-center">
                                    Subscribe Now!
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bagian Bawah Footer */}
            <div className="bg-footer-bottom-bg py-6 text-white text-center relative">
                <div className="container mx-auto px-4 flex justify-between items-center flex-col md:flex-row">
                    <p className="text-sm">Designed and Developed by ❤️</p>
                </div>
            </div>
        </footer>
    );
}
