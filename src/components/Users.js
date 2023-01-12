import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, addUser, editUser, deleteUser } from "../api/userApi";

import UsersCard from "./UsersCard";

function Users() {
  const queryClient = useQueryClient();
  const [addNewUser, setAddNewUser] = useState({
    username: "",
    email: "",
  });

  const { data, isLoading, isError, error } = useQuery("users", getUser);

  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const addNewUserMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const onAddNewUser = () => {
    addNewUserMutation.mutate(addNewUser);
    setAddNewUser({ username: "", email: "" });
  };

  const onEditHandler = (e) => {
    editUserMutation.mutate(e);
  };

  const onDeleteHandler = (id) => {
    deleteUserMutation.mutate(id);
  };

  const RenderData = () => {
    return data.map((data) => {
      return (
        <UsersCard
          key={data.id}
          id={data.id}
          username={data.username}
          email={data.email}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
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
                value={addNewUser.username}
                onChange={(e) =>
                  setAddNewUser({
                    ...addNewUser,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Username"
                className="p-1 px-2 mb-2 mt-2 shadow appearance-none border rounded w-2/5 text-gray-800"
              />
              <input
                name="email"
                value={addNewUser.email}
                onChange={(e) =>
                  setAddNewUser({
                    ...addNewUser,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Email"
                className="p-1 mb-2 mt-2 px-2 shadow appearance-none border rounded w-2/5 text-gray-800"
              />
              <button
                type="button"
                onClick={onAddNewUser}
                className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2"
              >
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
                  <tbody>
                    <RenderData />
                  </tbody>
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
