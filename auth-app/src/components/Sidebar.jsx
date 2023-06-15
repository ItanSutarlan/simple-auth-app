import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {
  const navigate = useNavigate()

  const logoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You need to relogin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token');
        Swal.fire("Logout!", "Your already logout.", "success");
        navigate('/login')
      }
    });
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content pt-16">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>

        {/* place content here */}
        <Outlet />

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-52 bg-base-100 text-white h-full" style={{ backgroundColor: "#4140CA" }}>
            <li onClick={logoutHandler}><a>Sign Out</a></li>
        </ul>
      </div>
    </div >
  )
}