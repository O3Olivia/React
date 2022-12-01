import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRoutes } from 'react-router-dom';
import MainNavigation from './components/MainNavigation';
import { getClient } from './queryClient';
import { routes } from './routes'; 

const App = () => { 
    const element = useRoutes(routes);
    const queryClient = getClient()
        
    return <QueryClientProvider client={queryClient}>
        <MainNavigation />
        {element}
        <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
}
export default App;