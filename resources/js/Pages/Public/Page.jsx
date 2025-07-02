import React, { useState, Fragment } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";

export default function PublicPage() {
    const { page, lecturers = [] } = usePage().props;
    const [selectedLecturer, setSelectedLecturer] = useState(null);

    const truncateWords = (text, count) => {
        const plain = text.replace(/<[^>]*>/g, "");
        const words = plain.split(/\s+/);
        return (
            words.slice(0, count).join(" ") + (words.length > count ? "…" : "")
        );
    };

    return (
        <div className="min-h-screen bg-white px-6 py-12 max-w-5xl mx-auto">
            <Head title={page.title} />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {page.title}
            </h1>

            {page.section_type === "lecturers" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lecturers.map((lecturer) => (
                        <div
                            key={lecturer.id}
                            onClick={() => setSelectedLecturer(lecturer)}
                            className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-md transition"
                        >
                            {lecturer.photo_path && (
                                <img
                                    src={`/storage/${lecturer.photo_path}`}
                                    alt={lecturer.name}
                                    className="h-40 w-full object-contain mb-4"
                                />
                            )}
                            <h3 className="text-xl font-semibold text-gray-800">
                                {lecturer.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {lecturer.position}
                            </p>
                            <p className="text-sm text-gray-700">
                                {truncateWords(lecturer.bio || "", 15)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            )}

            {/* Modal Detail Dosen */}
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
                                        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                                        onClick={() =>
                                            setSelectedLecturer(null)
                                        }
                                    >
                                        &times;
                                    </button>
                                    <div className="flex flex-col items-center space-y-4">
                                        {selectedLecturer?.photo_path && (
                                            <img
                                                src={`/storage/${selectedLecturer.photo_path}`}
                                                alt={selectedLecturer.name}
                                                className="h-40 object-contain"
                                            />
                                        )}
                                        <h2 className="text-2xl font-bold text-center text-gray-800">
                                            {selectedLecturer?.name}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {selectedLecturer?.position}
                                        </p>
                                        <div
                                            className="prose max-w-none text-sm"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    selectedLecturer?.bio || "",
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
