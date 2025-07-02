import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";

export default function EditLecturer({ lecturer, faculties }) {
    const { data, setData, put, processing, errors } = useForm({
        faculty_id: lecturer.faculty_id || "",
        name: lecturer.name || "",
        position: lecturer.position || "",
        bio: lecturer.bio || "",
        is_active: lecturer.is_active,
        photo: null,
    });

    const [previewUrl, setPreviewUrl] = useState(
        lecturer.photo_path ? `/storage/${lecturer.photo_path}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.lecturers.update", lecturer.id), data, {
            forceFormData: true,
            onSuccess: () => toast.success("Dosen berhasil diperbarui 🎉"),
            onError: () => toast.error("Gagal memperbarui dosen"),
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("photo", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
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
                .then((res) => res.json())
                .then((data) => resolve(data.location))
                .catch((err) => {
                    toast.error("Gagal upload gambar");
                    reject(err);
                });
        });

    return (
        <AuthenticatedLayout header="Edit Dosen">
            <Head title="Edit Dosen" />

            <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">Form Edit Dosen</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Fakultas */}
                    <div>
                        <label className="block font-medium text-sm mb-1">Fakultas</label>
                        <select
                            value={data.faculty_id}
                            onChange={(e) => setData("faculty_id", e.target.value)}
                            className="w-full border-gray-300 rounded shadow-sm"
                        >
                            <option value="">-- Pilih Fakultas --</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </option>
                            ))}
                        </select>
                        {errors.faculty_id && (
                            <div className="text-red-500 text-sm mt-1">{errors.faculty_id}</div>
                        )}
                    </div>

                    {/* Nama */}
                    <div>
                        <label className="block font-medium text-sm mb-1">Nama Dosen</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border-gray-300 rounded shadow-sm"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                        )}
                    </div>

                    {/* Jabatan */}
                    <div>
                        <label className="block font-medium text-sm mb-1">Jabatan</label>
                        <input
                            type="text"
                            value={data.position}
                            onChange={(e) => setData("position", e.target.value)}
                            className="w-full border-gray-300 rounded shadow-sm"
                        />
                        {errors.position && (
                            <div className="text-red-500 text-sm mt-1">{errors.position}</div>
                        )}
                    </div>

                    {/* Foto */}
                    <div className="space-y-2">
                        <label className="block font-medium mb-1">Foto</label>

                        {!previewUrl && (
                            <label className="cursor-pointer inline-block px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 text-sm text-gray-700">
                                Pilih Gambar
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        )}

                        {previewUrl && (
                            <div className="relative mt-2 inline-block border rounded p-1">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="h-24 object-contain"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setData("photo", null);
                                        setPreviewUrl(null);
                                    }}
                                    className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 hover:bg-red-700"
                                    title="Hapus"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {errors.photo && (
                            <div className="text-red-500 text-sm">{errors.photo}</div>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block font-medium text-sm mb-1">Bio</label>
                        <Editor
                            apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                            value={data.bio}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: "link image code lists table",
                                toolbar:
                                    "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                images_upload_handler: handleImageUpload,
                                automatic_uploads: true,
                                file_picker_types: "image",
                                file_picker_callback: (cb) => {
                                    const input = document.createElement("input");
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "image/*");
                                    input.onchange = function () {
                                        const file = this.files[0];
                                        const reader = new FileReader();
                                        reader.onload = function () {
                                            const id = "blobid" + new Date().getTime();
                                            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                            const base64 = reader.result.split(",")[1];
                                            const blobInfo = blobCache.create(id, file, base64);
                                            blobCache.add(blobInfo);
                                            cb(blobInfo.blobUri(), { title: file.name });
                                        };
                                        reader.readAsDataURL(file);
                                    };
                                    input.click();
                                },
                            }}
                            onEditorChange={(content) => setData("bio", content)}
                        />
                        {errors.bio && (
                            <div className="text-red-500 text-sm mt-1">{errors.bio}</div>
                        )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData("is_active", e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="is_active" className="text-sm text-gray-700">
                            Aktifkan Dosen
                        </label>
                    </div>

                    {/* Aksi */}
                    <div className="flex justify-between items-center">
                        <Link
                            href={route("admin.lecturers.index")}
                            className="text-gray-600 hover:underline text-sm"
                        >
                            ← Kembali ke daftar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
