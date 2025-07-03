import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";

export default function CreateNews() {
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        thumbnail: null,
        content: "",
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.news.store"), {
            forceFormData: true,
            onSuccess: () => toast.success("Berita berhasil ditambahkan 🎉"),
            onError: () =>
                toast.error("Gagal menambahkan berita. Silakan cek kembali."),
        });
    };

    const handleImageUpload = (blobInfo) =>
        new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());

            fetch(route("admin.upload.image"), {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            })
                .then((response) => response.json())
                .then((result) => resolve(result.location))
                .catch((error) =>
                    reject("Upload gagal: " + error.message || "Gagal")
                );
        });

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("thumbnail", file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout header="Tambah Berita">
            <Head title="Tambah Berita" />

            <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Form Tambah Berita
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">
                            Thumbnail
                        </label>

                        {!thumbnailPreview && (
                            <label className="cursor-pointer inline-block px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 text-sm text-gray-700">
                                Pilih Gambar
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setData("thumbnail", file);
                                            setThumbnailPreview(
                                                URL.createObjectURL(file)
                                            );
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {thumbnailPreview && (
                            <div className="relative mt-2 inline-block border rounded p-1">
                                <img
                                    src={thumbnailPreview}
                                    alt="Preview"
                                    className="h-24 object-contain"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setThumbnailPreview(null);
                                        setData("thumbnail", null);
                                    }}
                                    className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 hover:bg-red-700"
                                    title="Hapus"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {errors.thumbnail && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.thumbnail}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Konten Berita
                        </label>
                        <Editor
                            apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                            value={data.content}
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: "link image code lists table",
                                toolbar:
                                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code",
                                images_upload_handler: handleImageUpload,
                                automatic_uploads: true,
                                file_picker_types: "image",
                            }}
                            onEditorChange={(content) =>
                                setData("content", content)
                            }
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="is_active"
                            className="ml-2 block text-sm text-gray-700"
                        >
                            Tampilkan Berita
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href={route("admin.news.index")}
                            className="text-gray-600 hover:underline text-sm"
                        >
                            ← Kembali ke daftar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
