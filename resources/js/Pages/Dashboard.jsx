import { usePage, Head, Link } from "@inertiajs/react";
import {
    NewspaperIcon,
    BookOpenIcon,
    AcademicCapIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const { stats: fetchedStats, latest_news } = usePage().props;
    const stats = [
        {
            label: "Fakultas",
            value: fetchedStats.fakultas,
            color: "bg-blue-500",
            icon: BookOpenIcon,
        },
        {
            label: "Dosen",
            value: fetchedStats.dosen,
            color: "bg-green-500",
            icon: AcademicCapIcon,
        },
        {
            label: "Berita",
            value: fetchedStats.berita,
            color: "bg-purple-500",
            icon: NewspaperIcon,
        },
        {
            label: "Halaman Aktif",
            value: fetchedStats.halaman,
            color: "bg-indigo-500",
            icon: DocumentTextIcon,
        },
    ];

    const actions = [
        {
            label: "Tambah Fakultas",
            href: route("admin.faculties.create"),
            color: "bg-blue-500 hover:bg-blue-600",
        },
        {
            label: "Tambah Dosen",
            href: route("admin.lecturers.create"),
            color: "bg-green-500 hover:bg-green-600",
        },
        {
            label: "Kelola Halaman Home",
            href: route("admin.home.sections.index"),
            color: "bg-indigo-500 hover:bg-indigo-600",
        },
        {
            label: "Atur Menu Navigasi",
            href: route("admin.navigations.index"),
            color: "bg-orange-500 hover:bg-orange-600",
        },
    ];

    return (
        <AuthenticatedLayout>
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
                        <Link
                            key={index}
                            href={action.href}
                            className={`${action.color} text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-200 text-center`}
                        >
                            {action.label}
                        </Link>
                    ))}
                </div>

                {/* Berita Terbaru */}
                <div className="mt-10 bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Berita Terbaru
                    </h2>
                    <ul className="space-y-2">
                        {latest_news.map((item) => (
                            <li key={item.id} className="border-b pb-2">
                                <p className="font-medium text-blue-700">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        item.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
