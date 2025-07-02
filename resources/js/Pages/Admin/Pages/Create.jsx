import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";

export default function CreatePage() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        slug: "",
        content: "",
        section_type: "default",
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.pages.store"), {
            onSuccess: () => {
                toast.success("Halaman berhasil ditambahkan 🎉");
            },
            onError: () => {
                toast.error(
                    "Gagal menambahkan halaman. Silakan cek kembali input Anda."
                );
            },
        });
    };

    const handleImageUpload = (blobInfo, progress) =>
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
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            throw new Error(
                                errorData.message || "Gagal mengunggah gambar."
                            );
                        });
                    }
                    return response.json();
                })
                .then((result) => {
                    toast.success("Gambar berhasil diunggah 🎉");
                    resolve(result.location);
                })
                .catch((error) => {
                    toast.error("Upload gagal: " + error.message);
                    reject("Upload gagal: " + error.message);
                });
        });

    return (
        <AuthenticatedLayout header="Tambah Halaman">
            <Head title="Tambah Halaman" />

            <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Form Tambah Halaman
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Judul
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={data.title}
                            onChange={(e) => {
                                setData("title", e.target.value);
                                setData(
                                    "slug",
                                    e.target.value
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")
                                );
                            }}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                        />
                        {errors.slug && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Konten Halaman
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
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                images_upload_handler: handleImageUpload,
                                automatic_uploads: true,
                                file_picker_types: "image",
                                file_picker_callback: (cb, value, meta) => {
                                    const input =
                                        document.createElement("input");
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "image/*");

                                    input.onchange = function () {
                                        const file = this.files[0];
                                        const reader = new FileReader();
                                        reader.onload = function () {
                                            const id =
                                                "blobid" + new Date().getTime();
                                            const blobCache =
                                                tinymce.activeEditor
                                                    .editorUpload.blobCache;
                                            const base64 =
                                                reader.result.split(",")[1];
                                            const blobInfo = blobCache.create(
                                                id,
                                                file,
                                                base64
                                            );
                                            blobCache.add(blobInfo);

                                            cb(blobInfo.blobUri(), {
                                                title: file.name,
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    };
                                    input.click();
                                },
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Jenis Konten Halaman
                        </label>
                        <select
                            value={data.section_type}
                            onChange={(e) =>
                                setData("section_type", e.target.value)
                            }
                            className="w-full border-gray-300 rounded shadow-sm"
                        >
                            <option value="default">Konten Bebas</option>
                            <option value="lecturers">Daftar Dosen</option>
                            {/* Kamu bisa tambah opsi lain seperti fakultas, berita, dsb nanti */}
                        </select>
                        {errors.section_type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.section_type}
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
                            Aktifkan Halaman
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href={route("admin.pages.index")}
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
