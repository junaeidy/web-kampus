import PrimaryButton from '@/Components/PrimaryButton';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
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
                <Head title="Email Verification" />

                <div className="flex justify-center mb-6">
                    <ApplicationLogo className="h-8" />
                    <span className="text-2xl font-semibold text-gray-800 ml-2">STAI AL-HIKMAH</span>
                </div>

                <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Verify your email address</h2>

                <div className="mb-4 text-sm text-gray-600 text-center">
                    Thanks for signing up! Before getting started, could you verify
                    your email address by clicking on the link we just emailed to
                    you? If you didn't receive the email, we will gladly send you
                    another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center">
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButton
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            disabled={processing}
                        >
                            RESEND VERIFICATION EMAIL
                        </PrimaryButton>
                    </div>

                    <div className="mt-4 text-center">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}