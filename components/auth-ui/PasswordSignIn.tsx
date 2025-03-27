'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/utils/auth-helpers/client';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '../ui/input';

interface PasswordSignInProps {
    allowEmail: boolean;
    redirectMethod: string;
}

export default function PasswordSignIn({
    allowEmail,
    redirectMethod,
}: PasswordSignInProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        const success = await handleRequest(e, signInWithPassword, router);
        setIsSubmitting(false);

        if (success && redirectMethod === 'client') {
            router.push('/dashboard');
        }
    };

    return (
        <div>
            <form
                noValidate={true}
                className="mb-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label className="text-foreground" htmlFor="email">
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
                        className="mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
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
                            'Sign in'
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
            {allowEmail && (
                <p>
                    <Link
                        href="/dashboard/signin/email_signin"
                        className="font-medium text-foreground dark:text-white text-sm"
                    >
                        Sign in via magic link
                    </Link>
                </p>
            )}
            <p>
                <Link
                    href="/dashboard/signin/signup"
                    className="font-medium text-foreground dark:text-white text-sm"
                >
                    Don&apos;t have an account? Sign up
                </Link>
            </p>
        </div>
    );
}