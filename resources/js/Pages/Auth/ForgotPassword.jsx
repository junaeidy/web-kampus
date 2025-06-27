import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
            {/* Background image - Ganti URL gambar dengan milik Anda */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background.jpeg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>

            {/* Konten Forgot Password Card */}
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-auto z-10 sm:max-w-md">
                <Head title="Forgot Password" />

                <div className="flex justify-center mb-6">
                    <ApplicationLogo className="h-8" />
                    <span className="text-2xl font-semibold text-gray-800 ml-2">STAI AL-HIKMAH</span>
                </div>

                <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Reset your password</h2> 
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4"> {/* Mengurangi spasi vertikal */}
                    <div>
                        {/* Tambahkan InputLabel untuk email */}
                        <InputLabel htmlFor="email" value="Your email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            // Tambahkan styling konsisten
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="example@example.com"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* Sesuaikan styling tombol agar gelap dan teks kapital */}
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            disabled={processing}
                        >
                            EMAIL PASSWORD RESET LINK
                        </PrimaryButton>
                    </div>
                </form>

                {/* Tambahkan link kembali ke login, opsional */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Remembered your password?{' '}
                        <Link href={route('login')} className="font-medium text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}