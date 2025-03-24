import { 
  createRouter as createTanStackRouter, 
  createRootRoute, createRoute, Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Home from './pages/Home'
import Foo from './pages/Foo'
import Bar from './pages/Bar'

function NotFound() {
  return <div>404</div>
}

function Root() {
  return <div className='app-container'>
    <Outlet />
  </div>
}

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Home />,
})

const barRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'bar',
  component: () => <Bar/>
})

const fooRoute = createRoute({
  path: 'foo',
  getParentRoute: () => rootRoute,
  component: () => <Foo/>
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  fooRoute,
  barRoute,
])

// export const router = createRouter({
//   routeTree,
//   // defaultPreload: 'intent',
//   // defaultStaleTime: 5000,
//   // scrollRestoration: true,
// })

export const createRouter = () => {
  return createTanStackRouter({
    routeTree,
    // defaultPreload: 'intent',
    // defaultStaleTime: 5000,
    // scrollRestoration: true,
  })
};

export const router = createRouter();


// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}