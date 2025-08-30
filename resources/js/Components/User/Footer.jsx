import React from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Facebook, Instagram, Link2, MapPin, Phone, Mail } from "lucide-react";

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
    const currentFaculties = faculties.length > 0 ? faculties : defaultFaculties;

    return (
        <footer className="bg-gradient-to-b from-white to-gray-100 pt-16">
            <div className="container mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Logo & Info */}
                    <div>
                        <div className="flex items-center mb-5">
                            <ApplicationLogo className="h-10 w-10 text-custom-blue" />
                            <span className="ml-3 text-2xl font-bold text-gray-800">
                                STAI Al-Hikmah Pariangan
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            Sekolah Tinggi Agama Islam Al-Hikmah Pariangan Batusangkar adalah lembaga pendidikan tinggi Islam yang berkomitmen mencetak generasi unggul.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-custom-blue" />
                                Jorong Padang Panjang Pariangan No. 17, Tanah Datar, Sumbar.
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-custom-blue" /> 085379388533
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-custom-blue" /> info@staialhikmahpariangan.ac.id
                            </li>
                        </ul>

                        <div className="flex mt-5 space-x-3">
                            {[ 
                                { Icon: Facebook, href: "https://www.facebook.com/staialhikmahpariangan.ac.id/?locale=id_ID" },
                                { Icon: Instagram, href: "https://www.instagram.com/staialhikmahpariangan/" },
                                { Icon: Link2, href: "https://linktr.ee/staialhikmahpariangan" }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-custom-blue hover:text-white transition">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* News */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-5">Latest News</h3>
                        <div className="space-y-5">
                            {currentNews.map((item) => (
                                <Link key={item.id} href={item.url || "#"} className="flex items-center group">
                                    <img
                                        src={item.img || "/images/news-default.jpg"}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-lg mr-4 shadow"
                                    />
                                    <div>
                                        <p className="text-gray-700 group-hover:text-custom-blue transition font-medium text-sm">
                                            {item.title}
                                        </p>
                                        <span className="text-gray-500 text-xs">{item.date}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Faculties */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-5">Fakultas</h3>
                        <ul className="space-y-2">
                            {currentFaculties.map((faculty) => (
                                <li key={faculty.id}>
                                    <Link
                                        href={faculty.url || "#"}
                                        className="text-gray-600 hover:text-custom-blue transition text-sm"
                                    >
                                        {faculty.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-5">Newsletter</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Berlangganan untuk mendapatkan berita dan informasi terbaru dari kami.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue text-sm"
                            />
                            <button
                                type="submit"
                                className="w-full bg-custom-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-900 py-4 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} STAI Al-Hikmah Pariangan. All rights reserved.</p>
            </div>
        </footer>
    );
}
