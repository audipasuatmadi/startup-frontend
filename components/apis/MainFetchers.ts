import MainApi from "./MainApi";

export const getFetcher = (url: string) => MainApi.get(url).then(res => res.data);