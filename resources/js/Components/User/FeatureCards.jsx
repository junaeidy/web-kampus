import React from "react";
import { LayoutDashboard, Book, UserPlus } from "lucide-react";

export default function FeatureCards() {
    const features = [
        {
            id: 1,
            title: "SIAKAD",
            icon: LayoutDashboard,
            description:
                "Sistem Informasi Akademik yang terintegrasi untuk mahasiswa, dosen, dan administrasi kampus.",
            buttonText: "Jelajahi",
            link: "",
        },
        {
            id: 2,
            title: "Jurnal",
            icon: Book,
            description:
                "Akses ke publikasi ilmiah, jurnal penelitian, dan karya tulis dosen serta mahasiswa.",
            buttonText: "Telusuri",
            link: "https://ejournal.staialhikmahpariangan.ac.id/Journal/",
        },
        {
            id: 3,
            title: "PMB",
            icon: UserPlus,
            description:
                "Informasi lengkap dan pendaftaran Penerimaan Mahasiswa Baru tahun ajaran ini.",
            buttonText: "Daftar Sekarang",
            link: "https://pmb.staialhikmahpariangan.ac.id/",
        },
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#002663] via-[#003b99] to-[#0050d4] py-10 sm:py-16 px-3 sm:px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                            className="group relative p-5 sm:p-8 rounded-2xl 
                                       bg-white/10 backdrop-blur-md shadow-lg 
                                       border border-white/20 flex flex-col items-center text-center 
                                       transition-all duration-500 ease-in-out 
                                       hover:scale-[1.03] hover:shadow-2xl hover:bg-white/20"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white/20 mb-4 sm:mb-6 group-hover:bg-white/30 transition-all duration-500">
                                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-white tracking-wide group-hover:text-yellow-300 transition-colors duration-500">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs sm:text-base text-white/80 mb-6 sm:mb-8 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Button */}
                            <a
                                target="_blank"
                                href={feature.link}
                                className="relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold
                                           bg-yellow-400 text-[#002663] shadow-md 
                                           hover:bg-yellow-300 hover:shadow-lg transition-all duration-500 text-xs sm:text-base"
                            >
                                {feature.buttonText}
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
