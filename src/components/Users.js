import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import UsersCard from "./UsersCard";

function Users() {
  const fetchDataUser = async () => {
    const res = await axios.get("http://localhost:3636/api/user");
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "users",
    fetchDataUser
  );

  const renderData = () => {
    return data.map((data) => {
      return <UsersCard key={data.id} data={data} />;
    });
  };

  if (isLoading) return <span>Loading......</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div>
      <div class="flex flex-col">
        <div class="overflow-x-auto ">
          <div class="py-2 mt-10 mx-auto w-6/12">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-red-400 border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
  );
}

export default Users;
