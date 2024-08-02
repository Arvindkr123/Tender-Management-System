import { useLogoutMutation } from "@/redux/api/users";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      // Display an error message to the user
    }
  };

  const isAdmin = userInfo && userInfo.role === "admin";

  return (
    <nav className="h-[60px] flex w-full bg-slate-900 text-white p-3 justify-between items-center">
      <h2
        className="font-bold text-xl cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        TMS
      </h2>
      <ul className="flex gap-5">
        {!userInfo ? (
          <>
            <li>
              <button
                className="primary-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
            <li>
              <button
                className="primary-btn"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button className="primary-btn" onClick={() => navigate("/")}>
                <span className="text-white">Add Bid</span>
              </button>
            </li>
            <li>
              <button
                className="primary-btn"
                onClick={() => navigate("/user/bids")}
              >
                <span className="text-white">User Bids</span>
              </button>
            </li>
            <li>
              <button
                className="primary-btn"
                onClick={isAdmin && toggleDropdown}
              >
                <span className="text-white">{userInfo.name}</span>
              </button>
            </li>
            {dropdownOpen && (
              <li className="relative">
                {/* <button
                  className="primary-btn"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Admin Dashboard
                </button> */}
                <ul className="absolute top-10 right-5 w-[200px] bg-slate-900 text-white p-3 flex flex-col gap-2">
                  <>
                    {isAdmin && (
                      <li>
                        <button
                          className="primary-btn"
                          onClick={() => navigate("/admin/addTender")}
                        >
                          Add New Tender
                        </button>
                      </li>
                    )}
                  </>
                </ul>
              </li>
            )}
            <li>
              <button onClick={logoutHandler} className="danger-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
