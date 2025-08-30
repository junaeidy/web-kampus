import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";

export default function RunningText() {
    return (
        <div className="bg-custom-blue text-white py-3 shadow"> {/* Mengurangi padding vertikal */}
            {/* Tampilan Desktop */}
            <div className="hidden lg:flex container mx-auto px-4 items-center justify-between">
                {/* Kiri: Logo + Teks (Hanya Desktop) */}
                <div className="flex items-center space-x-3">
                    <ApplicationLogo className="h-10 w-10" />
                    <div>
                        <h1 className="text-lg md:text-xl font-bold leading-tight">
                            STAI Al-Hikmah Pariangan Batusangkar
                        </h1>
                        <p className="text-xs md:text-sm text-gray-200">
                            Kampus Riset Berbasis Nilai-Nilai Keislaman & Kebudayaan
                        </p>
                    </div>
                </div>

                {/* Kanan: Kontak + Sosmed (Desktop) */}
                <div className="flex flex-wrap md:flex-nowrap items-center space-x-4 text-xs md:text-sm">
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-yellow-300" />
                        <span>Batusangkar, Indonesia</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaPhoneAlt className="text-yellow-300" />
                        <span>+62 812-3456-7890</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <a href="https://facebook.com" target="_blank" className="hover:text-yellow-300">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" className="hover:text-yellow-300">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" className="hover:text-yellow-300">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Tampilan Mobile */}
            <div className="lg:hidden container mx-auto px-4 flex justify-between items-center">
                {/* Kiri: Lokasi & Nomor HP (Mobile) */}
                <div className="flex flex-col space-y-0.5"> {/* Mengurangi jarak antar elemen */}
                    <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="text-yellow-300 text-xs" /> {/* Mengecilkan ikon */}
                        <span className="text-[0.6rem]">Batusangkar, Indonesia</span> {/* Mengecilkan ukuran teks */}
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaPhoneAlt className="text-yellow-300 text-xs" /> {/* Mengecilkan ikon */}
                        <span className="text-[0.6rem]">+62 812-3456-7890</span> {/* Mengecilkan ukuran teks */}
                    </div>
                </div>

                {/* Kanan: Sosial Media Vertikal (Mobile) */}
                <div className="flex flex-col space-y-1"> {/* Mengurangi jarak antar ikon */}
                    <a href="https://facebook.com" target="_blank" className="hover:text-yellow-300 text-sm"> {/* Mengecilkan ikon */}
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" className="hover:text-yellow-300 text-sm"> {/* Mengecilkan ikon */}
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" className="hover:text-yellow-300 text-sm"> {/* Mengecilkan ikon */}
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    );
}
