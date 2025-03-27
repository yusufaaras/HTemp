'use client';

import { Button } from '@/components/ui/button';
import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '../ui/input';

interface UpdatePasswordProps {
    redirectMethod: string;
}

export default function UpdatePassword({ redirectMethod }: UpdatePasswordProps) {
    const router = useRouter(); // Hook koşul dışına taşındı
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Varsayılan form gönderme davranışını engelle
        setIsSubmitting(true);
        setPasswordError(null);

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const passwordConfirm = formData.get('passwordConfirm') as string;

        if (password !== passwordConfirm) {
            setPasswordError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        const success = await handleRequest(e, updatePassword, router); // Handle Request'in sonucunu al.
        setIsSubmitting(false);

        if (success && redirectMethod === 'client') {
            // Yönlendirme işlemini burada yap
            router.push('/dashboard'); // Örnek yönlendirme
        }
    };

    return (
        <div className="my-8">
            <form
                noValidate={true}
                className="mb-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label className="text-foreground dark:text-white" htmlFor="password">
                            New Password
                        </label>
                        <Input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
                            id="password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                        />
                        <label className="text-foreground dark:text-white" htmlFor="passwordConfirm">
                            Confirm New Password
                        </label>
                        <Input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 focus:outline-0 dark:placeholder:text-zinc-400"
                            id="passwordConfirm"
                            placeholder="Password"
                            type="password"
                            name="passwordConfirm"
                            autoComplete="new-password"
                        />
                        {passwordError && (
                            <p className="text-red-500">{passwordError}</p>
                        )}
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
                            'Update Password'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}