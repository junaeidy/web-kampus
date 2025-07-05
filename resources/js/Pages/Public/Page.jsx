import React, { useState, Fragment } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";
import Navbar from '@/Components/User/Navbar';
import Footer from '@/Components/User/Footer';
import ScrollToTopButton from '@/Components/ScrollToTopButton';

export default function PublicPage({ pages, navigations, faculties, recentNews }) {
    const { page, lecturers = [] } = usePage().props;
    const [selectedLecturer, setSelectedLecturer] = useState(null);

    const truncateWords = (text, count) => {
        const plain = text ? text.replace(/<[^>]*>/g, "") : "";
        const words = plain.split(/\s+/);
        return (
            words.slice(0, count).join(" ") + (words.length > count ? "…" : "")
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Head title={page.title} />
            <Navbar navigations={navigations} pages={pages} />
            <section
                className="relative bg-custom-blue text-white flex items-center justify-center overflow-hidden text-center"
                style={{
                    minHeight: '40vh',
                    marginTop: '72px',
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/32832428/pexels-photo-32832428/free-photo-of-cozy-reading-moment-with-coffee-and-book.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                        backgroundAttachment: 'fixed',
                    }}
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
                </div>

                <div className="relative z-10 p-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                        {page.title}
                    </h1>
                    <div className="h-1 w-24 bg-custom-green mx-auto mb-6"></div>

                    <div className="text-lg flex justify-center items-center gap-2">
                        <Link href={route('home')} className="text-white hover:text-gray-300 transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-custom-green">{page.title.length > 30 ? page.title.substring(0, 30) + '...' : page.title}</span>
                    </div>
                </div>
            </section>

            <main className="flex-grow bg-section-bg py-16 px-4">
                <div className="container mx-auto max-w-5xl bg-white p-8 rounded-lg shadow-md">
                    {page.section_type === "lecturers" ? (
                        <>
                            {page.content && (
                                <div className="prose max-w-none prose-lg text-gray-800 leading-relaxed mb-12"
                                     dangerouslySetInnerHTML={{ __html: page.content }} />
                            )}

                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Daftar Dosen</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {lecturers.map((lecturer) => (
                                    <div
                                        key={lecturer.id}
                                        onClick={() => setSelectedLecturer(lecturer)}
                                        className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
                                    >
                                        {lecturer.photo_path && (
                                            <div className="w-full h-48 overflow-hidden rounded-t-lg">
                                                <img
                                                    src={`/storage/${lecturer.photo_path}`}
                                                    alt={lecturer.name}
                                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {lecturer.name}
                                            </h3>
                                            <p className="text-base text-gray-600 mb-3">
                                                {lecturer.position}
                                            </p>
                                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                                                {truncateWords(lecturer.bio || "", 20)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div
                            className="prose max-w-none prose-lg text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    )}
                </div>
            </main>

            <Footer news={recentNews} faculties={faculties} />
            <ScrollToTopButton />

            <Transition appear show={!!selectedLecturer} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setSelectedLecturer(null)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-light" 
                                        onClick={() => setSelectedLecturer(null)}
                                    >
                                        &times;
                                    </button>
                                    <div className="flex flex-col items-center space-y-4 pt-4">
                                        {selectedLecturer?.photo_path && (
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-custom-blue shadow-lg">
                                                <img
                                                    src={`/storage/${selectedLecturer.photo_path}`}
                                                    alt={selectedLecturer.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
                                            {selectedLecturer?.name}
                                        </h2>
                                        <p className="text-base text-gray-600 mb-2">
                                            {selectedLecturer?.position}
                                        </p>
                                        <div
                                            className="prose max-w-none text-base text-gray-700 leading-relaxed px-4"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedLecturer?.bio || "",
                                            }}
                                        />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}