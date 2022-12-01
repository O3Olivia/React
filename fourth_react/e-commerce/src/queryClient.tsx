import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


type anyObj = { [key: string]: any };

// Create a client
export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client) client = new QueryClient({
            defaultOptions: {
                queries: {
                    cacheTime : 1000 * 60 * 60* 24,
                    staleTime: 1000 * 60,
                    refetchOnMount: false, //쓸데없는 요청들 다 false해서 없앰. => 값이 필요하지 않다.
                    // 이렇게되면 cache를 한번 요청하고나면 또 다시 같은 cache를 요청할 필요가 없다.
                    // 대신 새로고침을 하면 다시 불러온다 
                    refetchOnReconnect: false,
                    refetchOnWindowFocus: false,
                },
            },
        })
        return client
    }
})();

const BASE_URL = 'https://fakestoreapi.com';

export const fetcher = async({
    method,
    path,
    body,
    params
}:{
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        path: string;
        body?: anyObj;
        params?: anyObj;
}) => { 
    try {
        let url = `${BASE_URL}${path}`; 
        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': BASE_URL,
            },
        }

        if (params) { 
            const searchParams = new URLSearchParams(params)
            url += '?' + searchParams.toString()
        }
        if(body) fetchOptions.body = JSON.stringify(body)

        const res = await fetch(url, fetchOptions);
        const json = await res.json();
        return json
    } catch (error) {
        console.log(error)
    }
}

export const QueryKeys = {
    PRODUCTS : 'PRODUCTS',
}