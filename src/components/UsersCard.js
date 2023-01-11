import React, { useState } from "react";

function UsersCard({ data }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editField, setEditField] = useState({
    username: data.username,
    email: data.email,
  });
  const editData = () => {
    setIsEdit(!isEdit);
  };
  const onChangeHandler = () => {};
  return (
    <tr class="bg-gray-100 border-b">
      <td class="text-lg text-gray-900 font-semibold px-6 py-4 whitespace-nowrap w-1/3">
        {isEdit ? (
          <input
            name="username"
            value={editField.username}
            onChange={onChangeHandler}
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        ) : (
          data.username
        )}
      </td>
      <td class="text-lg text-gray-900 font-semibold px-6 py-4 whitespace-nowrap w-1/3">
        {isEdit ? (
          <input
            name="email"
            value={editField.email}
            onChange={onChangeHandler}
            class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        ) : (
          data.email
        )}
      </td>
      <td class="text-lg text-gray-900 font-semibold px-6 py-4 whitespace-nowrap w-1/3">
        {isEdit ? (
          <>
            <button
              type="button"
              class=" text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-20"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={editData}
              class="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-20"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              class=" text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-20"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={editData}
              class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-20"
            >
              Edit
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default UsersCard;
