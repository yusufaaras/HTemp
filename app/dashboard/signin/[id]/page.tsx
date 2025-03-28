import DefaultAuth from '@/components/auth';
import AuthUI from '@/components/auth/AuthUI';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod,
} from '@/utils/auth-helpers/settings';
import { PageProps } from 'next'; // PageProps'u içe aktarın

// AuthUI bileşeninin beklediği tipleri tanımlayın
type ViewPropType =
  | 'password_signin'
  | 'email_signin'
  | 'update_password'
  | 'signup'
  | 'forgot_password';

export default async function SignIn({ params, searchParams }: PageProps) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes() as ViewPropType[]; // getViewTypes'ın doğru tipleri döndürdüğünü varsayıyoruz
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' with the correct type
  let viewProp: ViewPropType;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id as ViewPropType)) {
    viewProp = params.id as ViewPropType;
  } else {
    const preferredSignInView = cookies().get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView) as ViewPropType;
    return redirect(`/dashboard/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient();

  const {
    data: { user },
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
          disableButton={searchParams?.disable_button} // searchParams'ı opsiyonel olarak kullanın
          allowOauth={allowOauth}
        />
      </div>
    </DefaultAuth>
  );
}