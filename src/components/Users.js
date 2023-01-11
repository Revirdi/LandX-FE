import axios from "axios";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, addUser, editUser, deleteUser } from "../api/userApi";

import UsersCard from "./UsersCard";

function Users() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery("users", getUser);

  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const onEditHandler = (e) => {
    editUserMutation.mutate(e);
  };
  // const fetchDataUser = async () => {
  //   const res = await axios.get("http://localhost:3636/api/user");
  //   return res.data;
  // };

  // const { data, isLoading, isError, error, refetch } = useQuery(
  //   "users",
  //   fetchDataUser
  // );
  // const onEditHandler = async (data) => {
  //   const res = await axios.put("http://localhost:3636/api/user", data);
  //   console.log(res);
  //   refetch();
  // };
  // const { mutate: editDataUser } = useMutation(editUser);

  // const onEditHandler = async (data) => {
  //   editDataUser(data);
  //   refetch();
  // };

  const renderData = () => {
    return data.map((data) => {
      return (
        <UsersCard
          key={data.id}
          id={data.id}
          username={data.username}
          email={data.email}
          onEditHandler={onEditHandler}
        />
      );
    });
  };

  if (isLoading) return <span>Loading......</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="w-6/12 mx-auto relative mt-10">
            <div className="flex flex-row justify-between">
              <input
                name="username"
                // value={editField.email}
                // onChange={onChangeHandler}
                placeholder="Username"
                className="p-1 px-2 mb-2 mt-2 shadow appearance-none border rounded w-2/5 text-gray-800"
              />
              <input
                name="email"
                // value={editField.email}
                // onChange={onChangeHandler}
                placeholder="Email"
                className="p-1 mb-2 mt-2 px-2 shadow appearance-none border rounded w-2/5 text-gray-800"
              />
              <button className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2">
                Add User
              </button>
            </div>
            <div className="py-2 w-full ">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-red-400 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderData()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
