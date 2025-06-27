import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background.jpeg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>

            <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-auto z-10 sm:max-w-md">
                <Head title="Confirm Password" />

                <div className="flex justify-center mb-6">
                    <ApplicationLogo className="h-8" />
                    <span className="text-2xl font-semibold text-gray-800 ml-2">STAI AL-HIKMAH</span>
                </div>

                <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Confirm your password</h2> 

                <div className="mb-4 text-sm text-gray-600 text-center"> 
                    This is a secure area of the application. Please confirm your password before continuing.
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••" 
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* Sesuaikan styling tombol agar gelap dan teks kapital */}
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            disabled={processing}
                        >
                            CONFIRM
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}