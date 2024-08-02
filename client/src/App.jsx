import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./shared-components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import TenderForm from "./pages/admin/TenderForm";
import PrivateRoute from "./pages/privateRoute";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";

const AppLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Suspense
        fallback={
          <div className="flex w-full h-[calc(100vh-64px)] justify-center items-center">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            {userInfo && userInfo?.role === "admin" && (
              <>
                <Route path="/admin/addTender" element={<TenderForm />} />
              </>
            )}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App = () => {
  return <AppLayout />;
};

export default App;
