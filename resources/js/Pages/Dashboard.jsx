import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    UsersIcon,
    BookOpenIcon,
    AcademicCapIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const stats = [
        {
            label: "Fakultas",
            value: 6,
            color: "bg-blue-500",
            icon: BookOpenIcon,
        },
        {
            label: "Dosen",
            value: 42,
            color: "bg-green-500",
            icon: AcademicCapIcon,
        },
        {
            label: "Mahasiswa",
            value: 920,
            color: "bg-purple-500",
            icon: UsersIcon,
        },
        {
            label: "Halaman Aktif",
            value: 12,
            color: "bg-indigo-500",
            icon: DocumentTextIcon,
        },
    ];

    const actions = [
        { label: "Tambah Fakultas", color: "bg-blue-500 hover:bg-blue-600" },
        { label: "Tambah Dosen", color: "bg-green-500 hover:bg-green-600" },
        {
            label: "Kelola Halaman Home",
            color: "bg-indigo-500 hover:bg-indigo-600",
        },
        {
            label: "Atur Menu Navigasi",
            color: "bg-orange-500 hover:bg-orange-600",
        },
        { label: "Atur Hero", color: "bg-pink-500 hover:bg-pink-600" },
        { label: "Manajemen SDM", color: "bg-teal-500 hover:bg-teal-600" },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.color} text-white rounded-xl shadow p-6 flex items-center`}
                        >
                            <stat.icon className="w-10 h-10 mr-4 opacity-80" />
                            <div>
                                <p className="text-lg font-semibold">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-bold">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tombol Aksi Cepat */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            className={`${action.color} text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-200`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
