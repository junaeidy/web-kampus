import React from 'react';

export default function HeroSectionWithContent() {
    return (
        <section
            className="relative bg-custom-blue text-white flex items-center justify-center overflow-hidden text-center"
            style={{
                minHeight: '75vh',
                marginTop: '20px',
            }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?_gl=1*1p82o9c*_ga*MzM0ODA3ODc2LjE3NDk3NzY0NDc.*_ga_8JE65Q40S6*czE3NTE2Nzk4MDYkbzEwJGcxJHQxNzUxNjc5ODI0JGo0MiRsMCRoMA..')",
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
            </div>
            <div className="relative z-10 p-4 max-w-3xl mx-auto">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                    Blog & Berita Terbaru
                </h1>

                <p className="text-md leading-relaxed mb-10 opacity-90">
                    Temukan informasi terkini seputar kegiatan kampus, pengumuman penting, dan berbagai artikel menarik lainnya. Tetap terhubung dengan update terbaru yang kami sajikan khusus untuk Anda.
                </p>
            </div>
        </section>
    );
}