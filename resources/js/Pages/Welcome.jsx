import React from 'react';
import Navbar from '@/Components/User/Navbar';
import Footer from '@/Components/User/Footer';
import { Head } from '@inertiajs/react';
import HeroSection from '@/Components/User/Hero';
import FeatureCards from '@/Components/User/FeatureCards';
import AboutSection from '@/Components/User/AboutSection';
import CallToActionSection from '@/Components/User/CallToActionSection';
import LatestNewsSection from '@/Components/User/LatestNewsSection';
import ScrollToTopButton from '@/Components/ScrollToTopButton';

export default function Home({ navigations, news, faculties, sections }) {
    const heroSection = sections.find(section => section.section_type === 'hero');
    const aboutSection = sections.find(section => section.section_type === 'about');
    const callToActionSection = sections.find(section => section.section_type === 'call_to_action');
    const cta = callToActionSection?.contents?.[0];

    return (
        <div>
            <Head>
                <title>Selamat datang di Website Kampus</title>
                <meta name="description" content="Website resmi Kampus STAI Al-Hikmah Pariangan. Dapatkan informasi terbaru mengenai fakultas, berita, fasilitas, dan kegiatan kampus kami." />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content="Selamat datang di Website Kampus STAI Al-Hikmah Pariangan" />
                <meta property="og:description" content="Dapatkan informasi terbaru mengenai fakultas, berita, fasilitas, dan kegiatan kampus kami." />
                <meta property="og:image" content="/images/logo.png" />
                <meta property="og:url" content="https://staialhikmahpariangan.ac.id/" />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Selamat datang di Website Kampus STAI Al-Hikmah Pariangan" />
                <meta name="twitter:description" content="Dapatkan informasi terbaru mengenai fakultas, berita, fasilitas, dan kegiatan kampus kami." />
                <meta name="twitter:image" content="/images/logo.png" />
            </Head>

            <Navbar navigations={navigations} />

            {heroSection && <HeroSection data={heroSection.contents} />}

            <div data-aos="fade-up">
                <FeatureCards />
            </div>

            {aboutSection && (
                <div data-aos="fade-up" data-aos-delay="100">
                    <AboutSection data={aboutSection} />
                </div>
            )}

            {cta && (
                <div data-aos="fade-up" data-aos-delay="200">
                    <CallToActionSection data={cta} />
                </div>
            )}

            <div data-aos="fade-up" data-aos-delay="300">
                <LatestNewsSection news={news} />
            </div>

            <Footer news={news} faculties={faculties} />
            <ScrollToTopButton />
        </div>
    );
}
