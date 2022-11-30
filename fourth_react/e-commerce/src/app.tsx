import { useRoutes } from 'react-router-dom';
import { routes } from './routes'; 

const app = () => { 
    const elem = useRoutes(routes);
    return elem
}
export default app