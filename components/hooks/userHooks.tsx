import useSWR from 'swr';
import { getFetcher } from '../apis/MainFetchers';
import { AxiosError } from 'axios';
import { fetchFromStorage } from '../apis/localstorage_apis/LocalStorageApi';

export interface UserData {
  name: string;
  username: string;
  profileURL?: string;
}

export interface UseUserDataReturn {
  userData?: UserData,
  isLoading: boolean,
  isError?: AxiosError
}

export interface FullUserData {
  id: number;
  name: string;
  username: string;
  profileURL?: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export const useUserData = (id: string) => {
  const { data, error } = useSWR<UserData | undefined, AxiosError>(
    `users/${id}`,
    getFetcher
  );

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUserStorage = () => {
  const { data } = useSWR<FullUserData | null>('user', fetchFromStorage)
  return data
}