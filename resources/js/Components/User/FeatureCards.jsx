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
            link: "",
        },
    ];

    return (
        <section className="bg-section-bg py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                            className="group relative p-8 rounded-lg shadow-lg flex flex-col items-center text-center bg-white overflow-hidden
                                       transition-all duration-300 ease-in-out hover:shadow-xl"
                        >
                            <span className="absolute bottom-0 left-0 h-1 bg-custom-blue w-0 group-hover:w-full transition-all duration-500 ease-out"></span>

                            <div className="relative z-10">
                                <div className="mb-6">
                                    <feature.icon className="w-16 h-16 text-gray-600 transition duration-300" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-gray-800 transition duration-300 cursor-pointer hover:text-custom-blue">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 mb-8 transition duration-300">
                                    {feature.description}
                                </p>

                                <a
                                    target="_blank"
                                    href={feature.link}
                                    className="group/button relative inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300
                                               border border-gray-300 text-gray-700 bg-white overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-custom-blue -translate-x-full group-hover/button:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                                    <span className="relative z-10 flex items-center">
                                        <span className="mr-2 group-hover/button:text-white transition-colors duration-300">
                                            {feature.buttonText}
                                        </span>
                                        <svg
                                            className="w-4 h-4 group-hover/button:text-white transition-transform duration-300 transform group-hover/button:translate-x-1"
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
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
