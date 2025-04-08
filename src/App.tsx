import {
  Route,
  Link,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

import GuessPage from './routes/guess-page.tsx'
import SamplePage from './routes/sample-page.tsx'
import ErrorBoundary from './routes/error-boundary'

import './App.scss'

// Uncomment this when you're ready to replace "Not found" error boundary page with a dedicated "Not found" page.
// import NoMatch from './routes/no-match'

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<NavLayout />} errorElement={<ErrorBoundary />}>
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route errorElement={<ErrorBoundary />}>
        <Route index element={<GuessPage gameId={1} />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sample-page" element={<SamplePage />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Route>,
  ),
)

export default function App() {
  return (
    <>
      {/* Routes nest inside one another. Nested route paths build upon
                parent route paths, and nested route elements render inside
                parent route elements. See the note about <Outlet> below. */}
      <RouterProvider router={router} />
    </>
  )
}

function Layout() {
  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="_left">
            <button>GitHub</button>
          </div>
          <div className="_center">
            <h1 className="_logo">VGMdle</h1>
          </div>
          <div className="_right">
            <button>Day Select</button>
          </div>
        </div>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}

      <section className="main">
        <Outlet />
      </section>

      <footer className="text-center" style={{ fontSize: '0.8em' }}>
        <div className="footer-container">
          <p>
            © 2025 David Hong. <Link to="https://github.com/Oasiris/VGMdle">Code</Link> licensed
            under the GNU General Public License v3.0.
          </p>
          <p>
            Audio clips are included for non-commercial, educational, and entertainment purposes
            under fair use.
          </p>
          <p>
            This project makes no claim of ownership over any music or audio originating from
            third-party games.
          </p>
          <p>This website is intended solely for educational and entertainment use.</p>
        </div>
      </footer>
    </>
  )
}

// function NavLayout() {
//     return (
//         <div>
//             {/* A "layout route" is a good place to put markup you want to
//             share across all the pages on your site, like navigation. */}
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/dashboard">Dashboard</Link>
//                     </li>
//                     <li>
//                         <Link to="/nothing-here">Nothing Here</Link>
//                     </li>
//                 </ul>
//             </nav>

//             <hr />

//             {/* An <Outlet> renders whatever child route is currently active,
//             so you can think about this <Outlet> as a placeholder for
//             the child routes we defined above. */}
//             <Outlet />

//             <hr />

//             <footer>
//                 <br />
//                 This is a basic footer.
//             </footer>
//         </div>
//     )
// }

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the About section</p>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the Dashboard</p>
    </div>
  )
}
