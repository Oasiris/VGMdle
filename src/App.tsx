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

// Uncomment this when you're ready to replace "Not found" error boundary page with a dedicated "Not found" page.
// import NoMatch from './routes/no-match'

const router = createBrowserRouter(
    createRoutesFromElements(
        // <Route path="/" element={<NavLayout />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route errorElement={<ErrorBoundary />}>
                <Route index element={<GuessPage />} />
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
        <div>
            <h3>VGMdle</h3>

            {/* Routes nest inside one another. Nested route paths build upon
                parent route paths, and nested route elements render inside
                parent route elements. See the note about <Outlet> below. */}
            <RouterProvider router={router} />
        </div>
    )
}

function Layout() {
    return (
        <div>
            <hr />

            {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
            <Outlet />

            <hr />

            <footer>
                <p>
                    © 2025 David Hong. <Link to="https://github.com/Oasiris/VGMdle">Code</Link>{' '}
                    licensed under the GNU General Public License v3.0.
                </p>
                <p>
                    All audio clips are property of their respective copyright holders and are used
                    under fair use for non-commercial, educational, and entertainment purposes.
                </p>
                <p>
                    No part of this project should be interpreted as claiming ownership over any
                    copyrighted music or material from third-party games.
                </p>
                <p>This web application is for educational and entertainment purposes only.</p>
            </footer>
        </div>
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
