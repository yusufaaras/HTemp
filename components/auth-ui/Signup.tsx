'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../ui/input';

interface SignUpProps {
    allowEmail: boolean;
    redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
    const router = useRouter(); // Hook koşul dışına taşındı
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        const success = await handleRequest(e, signUp, router); // Handle Request'in sonucunu al.
        setIsSubmitting(false);

        if (success && redirectMethod === 'client') {
            // Yönlendirme işlemini burada yap
            router.push('/dashboard'); // Örnek yönlendirme
        }
    };

    return (
        <div className="mb-8">
            <form
                noValidate={true}
                className="mb-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label className="text-foreground dark:text-white" htmlFor="email">
                            Email
                        </label>
                        <Input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            name="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                        />
                        <label
                            className="text-foreground mt-2 dark:text-white"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="mt-2 flex h-[unset] w-full items-center justify-center rounded-md px-4 py-4 text-sm font-medium"
                    >
                        {isSubmitting ? (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="mr-2 inline h-4 w-4 animate-spin text-zinc-200 duration-500 dark:text-zinc-950"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* ... SVG kodu ... */}
                            </svg>
                        ) : (
                            'Sign up'
                        )}
                    </Button>
                </div>
            </form>
            <p>
                <Link
                    href="/dashboard/signin/forgot_password"
                    className="font-medium text-foreground dark:text-white text-sm"
                >
                    Forgot your password?
                </Link>
            </p>
            <p className="font-medium text-sm dark:text-white">
                <Link
                    href="/dashboard/signin/password_signin"
                    className="font-medium text-sm dark:text-white"
                >
                    Already have an account?
                </Link>
            </p>
            {allowEmail && (
                <p className="font-medium text-sm dark:text-white">
                    <Link
                        href="/dashboard/signin/email_signin"
                        className="font-medium text-sm dark:text-white"
                    >
                        Sign in via magic link
                    </Link>
                </p>
            )}
        </div>
    );
}