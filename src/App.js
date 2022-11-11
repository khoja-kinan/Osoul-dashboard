import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

import IndexDashboard from "./dashboard/IndexDashboard";

import DashboardApp from "./dashboard/pages/DashboardApp";
import User from "./dashboard/pages/User";
import DashboardLayout from "./dashboard/layouts/dashboard";
import NotFound from "./dashboard/pages/Page404";
import Unauthorized from "./dashboard/pages/Unauthorized";
import { HelmetProvider } from "react-helmet-async";
import Cities from "./dashboard/pages/Cities";
import Estate from "./dashboard/pages/Estate";
import Areas from "./dashboard/pages/Areas";
import Categories from "./dashboard/pages/Categories";
import EstateTypes from "./dashboard/pages/EstateTypes";
import AreaSupscription from "./dashboard/pages/AreaSupscription";
import Properies from "./dashboard/pages/Properies";
import CategorySupscription from "./dashboard/pages/CategorySupscription";
import NeighborhoodSupscription from "./dashboard/pages/NeighborhoodSupscription";
import Neighborhoods from "./dashboard/pages/Neighborhoods";

function App() {
  return (
    <div className="Pagecontainer">
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<IndexDashboard />} />

          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route path="app" element={<DashboardApp />} />

            {/* <Route element={<RequireAuth allowedRoles={[1]} />}> */}
            <Route path="user" element={<User />} />
            {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[13]} />}> */}
            <Route path="cities" element={<Cities />} />
            {/*  </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="estates" element={<Estate />} />
            {/*  </Route>*/}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="areas" element={<Areas />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="neighborhoods" element={<Neighborhoods />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="categories" element={<Categories />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="estate-types" element={<EstateTypes />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="area-subscriptions" element={<AreaSupscription />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route
              path="category-subscriptions"
              element={<CategorySupscription />}
            />
            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="properies" element={<Properies />} />
            {/* </Route> */}
          </Route>
          {/*  </Route> */}

          {/* Catch All */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
