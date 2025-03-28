'use client';

import DefaultAuth from '@/components/auth';
import AuthUI from '@/components/auth/AuthUI';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import {
    getAuthTypes,
    getViewTypes,
    getDefaultSignInView,
    getRedirectMethod
} from '@/utils/auth-helpers/settings';

interface SignInProps {
    params: { id: string };
    searchParams: { disable_button: boolean };
}

export default async function SignIn({
    params,
    searchParams
}: SignInProps) {
    const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
    const viewTypes = getViewTypes();
    const redirectMethod = getRedirectMethod();

    let viewProp: string;

    if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
        viewProp = params.id;
    } else {
        const preferredSignInView = cookies().get('preferredSignInView')?.value || null;
        viewProp = getDefaultSignInView(preferredSignInView);
        return redirect(`/dashboard/signin/${viewProp}`);
    }

    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (user && viewProp !== 'update_password') {
        return redirect('/dashboard/main');
    } else if (!user && viewProp === 'update_password') {
        return redirect('/dashboard/signin');
    }

    return (
        <DefaultAuth viewProp={viewProp}>
            <div>
                <AuthUI
                    viewProp={viewProp}
                    user={user}
                    allowPassword={allowPassword}
                    allowEmail={allowEmail}
                    redirectMethod={redirectMethod}
                    disableButton={searchParams.disable_button}
                    allowOauth={allowOauth}
                />
            </div>
        </DefaultAuth>
    );
}