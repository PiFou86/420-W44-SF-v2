import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { FetchClients } from "./components/FetchClients";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
    {
        path: '/fetch-data',
        //requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/fetch-clients',
        //requireAuth: true,
        element: <FetchClients />
    }//,
  //...ApiAuthorzationRoutes
];

export default AppRoutes;
