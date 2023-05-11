import Head from 'next/head';
import { Container } from '@/components/Container';
import { useEffect } from 'react';

// get property from route
export async function getServerSideProps({
  params,
}: {
  params: { provider: string };
}) {
  return {
    props: {
      params,
    },
  };
}

export default function AuthCallbackPage({
  params,
}: {
  params: { provider: string };
}) {
  // @ts-ignore
  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

  useEffect(() => {
    const data = fetch(
      `http://falko-backend.test/api/auth/${params.provider}/callback${window.location.search}`
    )
      .then((res) => res.json())
      .then((data) => {
        // if data has property token
        if (data.token !== undefined) {
          localStorage.setItem('authToken', data.token);
          window.location.href = '/';
        }
      });
  });

  return (
    <>
      <Head>
        <title>Logging in...</title>
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div>Logging in...</div>
      </Container>
    </>
  );
}
