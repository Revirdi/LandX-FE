import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3636",
});

export const getUser = async () => {
  const response = await axiosInstance.get("/api/user");
  return response.data;
};

export const addUser = async (data) => {
  return await axiosInstance.post("/api/user", data);
};

export const editUser = async (data) => {
  try {
    const res = await axiosInstance.put("/api/user", data);
    return alert(res.data.message);
  } catch (error) {
    return alert(error?.response?.data?.message);
  }
};

export const deleteUser = async (id) => {
  return await axiosInstance.delete("/api/user/" + id);
};
