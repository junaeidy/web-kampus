import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background.jpeg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay gelap */}
            </div>

            {/* Konten Login Card */}
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-auto z-10 sm:max-w-md"> 
                <Head title="Log in" />

                <div className="flex justify-center mb-6">
                    {/* Logo */}
                    <ApplicationLogo className="h-8" />
                    <span className="text-2xl font-semibold text-gray-800 ml-2">STAI AL-HIKMAH</span>
                </div>

                <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Sign in to your account</h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="Your email" /> 

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="example@example.com"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ms-2 text-sm text-gray-900">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div>
                        {/* Mengubah warna tombol menjadi gelap */}
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            disabled={processing}
                        >
                            LOG IN TO YOUR ACCOUNT
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}