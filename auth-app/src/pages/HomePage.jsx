/* eslint-disable react/no-unescaped-entities */
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading"
import { getUsers } from "../services/user";

export default function HomePage() {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      const responseJson = await response.json();
      if (response.ok) {
        setUsers(responseJson);
      } else {
        Swal.fire({
          title: "Error",
          text: responseJson.message,
          icon: "error",
        });        
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      {
        loading ? (
          <div className="h-screen flex justify-center items-center">
            <ReactLoading
              className="mx-auto"
              type={"bars"}
              color={"#03fc4e"}
              height={100}
              width={100}
            />
          </div>
        ): (
          <div className="text-xs text-center lg:block px-5 mb-20">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">Users</h1>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-compact w-full text-center">
                <thead className="text-lg font-medium">
                  <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>age</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user, i) => {
                      return (
                        <tr key={user.id}>
                          <th>{i + 1}</th>
                          <td><span className="w-48 truncate inline-block align-middle">{user.username}</span></td>
                          <td><span className="w-48 truncate inline-block align-middle">{user.age}</span></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              {users.length === 0 && <p className="text-center text-lg font-medium mt-4">There is no user yet</p>}
            </div>
          </div>
        )
      }
    </>
  )
}