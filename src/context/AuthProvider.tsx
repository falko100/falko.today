import useSWR from 'swr';

export const login = async () => {
  const {redirect} = await fetch(
    'http://falko-backend.test/api/auth/google'
  ).then((res) => res.json());

  window.location.href = redirect;
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const useUser = () => {
  const {data, error} = useSWR(
    'http://falko-backend.test/api/user',
    (...args) =>
      fetch(...args, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }).then((res) => res.json())
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
