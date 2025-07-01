import React from 'react';
import Navbar from '@/Components/User/Navbar';
import { Head } from '@inertiajs/react';

export default function Home({ navigations }) {
    return (
        <div>
            <Head title="Selamat datang di Website Kampus" />
            <Navbar navigations={navigations} />

            <main className="p-6">
                <h1 className="text-2xl font-bold">Selamat datang di Website Kampus</h1>
                <p className="text-gray-600 mt-2">Ini adalah halaman depan.</p>
            </main>
        </div>
    );
}
