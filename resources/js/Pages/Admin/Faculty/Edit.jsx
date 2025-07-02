import React, { useEffect, useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";

export default function EditFaculty({ faculty }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "PUT",
        name: faculty.name || "",
        description: faculty.description || "",
        logo: null,
    });

    const [logoPreview, setLogoPreview] = useState(
        faculty.logo_path ? `/storage/${faculty.logo_path}` : null
    );
    const [removeLogo, setRemoveLogo] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = {
            ...data,
            remove_logo: removeLogo, // send boolean if logo is removed
        };

        post(route("admin.faculties.update", faculty.id), {
            data: form,
            forceFormData: true,
            onSuccess: () => {
                toast.success("Fakultas berhasil diperbarui 🎉");
            },
            onError: () => {
                toast.error("Gagal menyimpan perubahan.");
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
                        .getAttribute("description"),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    toast.success("Gambar berhasil diunggah 🎉");
                    resolve(data.location);
                })
                .catch((err) => {
                    toast.error("Upload gagal: " + err.message);
                    reject("Upload gagal: " + err.message);
                });
        });

    return (
        <AuthenticatedLayout header="Edit Fakultas">
            <Head title="Edit Fakultas" />

            <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Form Edit Fakultas
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Fakultas
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Logo Fakultas */}
                    <div className="space-y-2">
                        <label className="block font-medium mb-1">Logo</label>

                        {/* Tombol Custom File Input */}
                        {!logoPreview && (
                            <label className="cursor-pointer inline-block px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 text-sm text-gray-700">
                                Pilih Gambar
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setData("logo", file);
                                            setLogoPreview(
                                                URL.createObjectURL(file)
                                            );
                                            setRemoveLogo(false);
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {/* Preview + Tombol Hapus */}
                        {logoPreview && (
                            <div className="relative mt-2 inline-block border rounded p-1">
                                <img
                                    src={logoPreview}
                                    alt="Preview"
                                    className="h-24 object-contain"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLogoPreview(null);
                                        setData("logo", null);
                                        setRemoveLogo(true);
                                    }}
                                    className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 hover:bg-red-700"
                                    title="Hapus"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {errors.logo && (
                            <div className="text-red-500 text-sm">
                                {errors.logo}
                            </div>
                        )}
                    </div>

                    {/* Editor Konten */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <Editor
                            apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                            value={data.description}
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
                            onEditorChange={(description) =>
                                setData("description", description)
                            }
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    {/* Tombol */}
                    <div className="flex justify-between items-center">
                        <Link
                            href={route("admin.faculties.index")}
                            className="text-gray-600 hover:underline text-sm"
                        >
                            ← Kembali ke daftar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
