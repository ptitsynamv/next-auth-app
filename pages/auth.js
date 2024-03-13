import AuthForm from '../components/auth/auth-form';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    router.replace('/');
  }

  return <AuthForm />;
}

export default AuthPage;
