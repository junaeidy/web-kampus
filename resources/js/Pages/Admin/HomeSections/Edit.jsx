import React, { useState, useEffect } from 'react';
import { useForm, Link, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast } from "react-hot-toast";

const ContentFields = ({ sectionType, content, index, handleContentChange, multipleContent, removeContentBlock }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(content.image_url || null);

  React.useEffect(() => {
    if (content.image instanceof File) {
      const url = URL.createObjectURL(content.image);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (content.image_url) {
      setImagePreviewUrl(content.image_url);
    } else {
      setImagePreviewUrl(null);
    }
  }, [content.image, content.image_url]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleContentChange(index, { target: { name: 'image', value: file } });
    } else {
      handleContentChange(index, { target: { name: 'image', value: null } });
    }
  };

  const removeImage = () => {
    handleContentChange(index, { target: { name: 'image', value: null } });
    setImagePreviewUrl(null);
    const fileInput = document.getElementById(`image-${index}`);
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-4 bg-white shadow-sm">
      {multipleContent && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={() => removeContentBlock(index)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Hapus Konten
          </button>
        </div>
      )}
      {(sectionType === 'hero' || sectionType === 'about' || sectionType === 'gallery') && (
        <>
          <div className="mb-4">
            <label htmlFor={`headline-${index}`} className="block text-sm font-medium text-gray-700">Headline</label>
            <input
              type="text"
              id={`headline-${index}`}
              name="headline"
              value={content.headline || ''}
              onChange={(e) => handleContentChange(index, e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan headline..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={content.description || ''}
              onChange={(e) => handleContentChange(index, e)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan deskripsi..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor={`image-${index}`} className="block text-sm font-medium text-gray-700">Gambar</label>
            <input
              type="file"
              id={`image-${index}`}
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreviewUrl && (
              <div className="mt-2 flex items-center space-x-4">
                <img src={imagePreviewUrl} alt="Preview" className="max-w-xs h-24 object-cover rounded-md shadow-md"
                     onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x100/A0A0A0/FFFFFF?text=Gambar+Tidak+Tersedia"; }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Hapus Gambar
                </button>
              </div>
            )}
            {/* Display error for image field if any */}
            {content.imageError && <div className="text-red-500 text-sm mt-1">{content.imageError}</div>}
          </div>
        </>
      )}

      {sectionType === 'announcement' && (
        <>
          <div className="mb-4">
            <label htmlFor={`headline-${index}`} className="block text-sm font-medium text-gray-700">Headline</label>
            <input
              type="text"
              id={`headline-${index}`}
              name="headline"
              value={content.headline || ''}
              onChange={(e) => handleContentChange(index, e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan headline pengumuman..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={content.description || ''}
              onChange={(e) => handleContentChange(index, e)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan deskripsi pengumuman..."
            ></textarea>
          </div>
        </>
      )}

      {sectionType === 'call_to_action' && (
        <>
          <div className="mb-4">
            <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">Judul CTA</label>
            <input
              type="text"
              id={`title-${index}`}
              name="title"
              value={content.title || ''}
              onChange={(e) => handleContentChange(index, e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan judul call to action..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Deskripsi CTA</label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={content.description || ''}
              onChange={(e) => handleContentChange(index, e)}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan deskripsi call to action..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor={`button_text-${index}`} className="block text-sm font-medium text-gray-700">Teks Tombol</label>
            <input
              type="text"
              id={`button_text-${index}`}
              name="button_text"
              value={content.button_text || ''}
              onChange={(e) => handleContentChange(index, e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan teks tombol..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`cta_link-${index}`} className="block text-sm font-medium text-gray-700">Link CTA</label>
            <input
              type="text"
              id={`cta_link-${index}`}
              name="cta_link"
              value={content.cta_link || ''}
              onChange={(e) => handleContentChange(index, e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan link CTA..."
            />
          </div>
        </>
      )}
    </div>
  );
};

function Edit({ homeSection }) {
  const initialContents = homeSection.contents.map(content => ({
    ...content,
    image: null, // Jangan isi string di sini
  image_url: content.image_url ?? null,
  }));

  const { data, setData, put, processing, errors } = useForm({
    section_type: homeSection.section_type || '',
    order: homeSection.order || '',
    multiple_content: homeSection.multiple_content || false,
    contents: initialContents,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prev => {
      const newData = { ...prev, [name]: type === 'checkbox' ? checked : value };

      if (name === 'section_type' || (name === 'multiple_content' && !checked)) {
        newData.contents = [];
        if (!newData.multiple_content && newData.section_type) {
            newData.contents = [{ headline: '', description: '', image: null, title: '', button_text: '', cta_link: '' }];
        }
      }
      if (name === 'multiple_content' && checked && newData.contents.length === 0) {
        newData.contents = [{ headline: '', description: '', image: null, title: '', button_text: '', cta_link: '' }];
      }
      if (name === 'section_type' && value && !newData.multiple_content && newData.contents.length === 0) {
        newData.contents = [{ headline: '', description: '', image: null, title: '', button_text: '', cta_link: '' }];
      }
      return newData;
    });
  };

  const handleContentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContents = data.contents.map((content, i) =>
      i === index ? { ...content, [name]: value } : content
    );
    setData('contents', updatedContents);
  };

  const addContentBlock = () => {
    setData('contents', [
      ...data.contents,
      { headline: '', description: '', image: null, title: '', button_text: '', cta_link: '' }
    ]);
  };

  const removeContentBlock = (index) => {
    setData('contents', data.contents.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PUT');

    formData.append('section_type', data.section_type);
    formData.append('order', data.order);
    formData.append('multiple_content', data.multiple_content ? '1' : '0');
    formData.append('is_visible', '1');

    data.contents.forEach((content, index) => {
      if (content.id) formData.append(`contents[${index}][id]`, content.id);
      formData.append(`contents[${index}][headline]`, content.headline ?? '');
      formData.append(`contents[${index}][description]`, content.description ?? '');
      formData.append(`contents[${index}][title]`, content.title ?? '');
      formData.append(`contents[${index}][button_text]`, content.button_text ?? '');
      formData.append(`contents[${index}][cta_link]`, content.cta_link ?? '');

      if (content.image instanceof File) {
  formData.append(`contents[${index}][image]`, content.image);
} else if (content.image === null && !content.image_url) {
  formData.append(`contents[${index}][image]`, '');
}
    });

    router.post(route('admin.home.sections.update', homeSection.id), formData, {
      onSuccess: () => toast.success("Beranda berhasil diubah."),
      onError: () => toast.error("Gagal mengubah beranda."),
    });
  };


  return (
    <AuthenticatedLayout header="Edit Bagian Beranda">
    <Head title="Edit Bagian Beranda" />
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Bagian Beranda</h1>

        <Link
          href={route('admin.home.sections.index')}
          className="inline-block mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          &larr; Kembali ke Daftar
        </Link>

        <form onSubmit={handleSubmit} className="p-6 border border-blue-200 rounded-lg bg-blue-50">
          <div className="mb-4">
            <label htmlFor="section_type" className="block text-sm font-medium text-gray-700">Tipe Bagian</label>
            <select
              id="section_type"
              name="section_type"
              value={data.section_type}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
              disabled
            >
              <option value="">Pilih Tipe Bagian</option>
              <option value="hero">Hero</option>
              <option value="about">Tentang</option>
              <option value="gallery">Galeri</option>
              <option value="announcement">Pengumuman</option>
              <option value="call_to_action">Call to Action</option>
            </select>
            {errors.section_type && <div className="text-red-500 text-sm mt-1">{errors.section_type}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">Urutan</label>
            <input
              type="number"
              id="order"
              name="order"
              value={data.order}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Masukkan urutan (misal: 1, 2, 3)"
              required
            />
            {errors.order && <div className="text-red-500 text-sm mt-1">{errors.order}</div>}
          </div>

          {data.section_type && (
            <>
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="multiple_content"
                    name="multiple_content"
                    type="checkbox"
                    checked={data.multiple_content}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="multiple_content" className="ml-2 block text-sm text-gray-900">
                    Lebih dari 1 konten
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Render content forms based on section type and multiple_content */}
          {data.section_type && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Detail Konten:</h3>
              {data.multiple_content && data.contents.length === 0 && (
                <p className="text-gray-600 mb-4">Klik "Tambah Konten" untuk menambahkan blok konten.</p>
              )}
              {data.contents.map((content, index) =>
                <ContentFields
                  key={content.id || `new-${index}`}
                  sectionType={data.section_type}
                  content={content}
                  index={index}
                  handleContentChange={handleContentChange}
                  multipleContent={data.multiple_content}
                  removeContentBlock={removeContentBlock}
                />
              )}

              {data.multiple_content && (
                <button
                  type="button"
                  onClick={addContentBlock}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md"
                >
                  Tambah Konten
                </button>
              )}
              {!data.multiple_content && data.section_type && data.contents.length === 0 && (
                <ContentFields
                  sectionType={data.section_type}
                  content={{ headline: '', description: '', image: null, title: '', button_text: '', cta_link: '' }}
                  index={0}
                  handleContentChange={handleContentChange}
                  multipleContent={false}
                  removeContentBlock={() => {}}
                />
              )}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            disabled={processing}
          >
            {processing ? 'Memperbarui...' : 'Perbarui Bagian'}
          </button>
        </form>
      </div>
    </div>
    </AuthenticatedLayout>
  );
}

export default Edit;
