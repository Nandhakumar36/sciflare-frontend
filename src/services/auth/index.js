
import { post, put, deleteFunction } from "../http";
import { persist } from "../local-storage";

export const signIn = async (user) => {
  let data;
  try {
    data = await post(`api/v1/users/login`, user);
    console.log(data)
    await persist("authToken", data.token);
  } catch (error) {
    throw error;
  }
  return data;
};

export const signUp = async (body) => {
  try {
    const 
      data = await post(`api/v1/users/register`, body);
      console.log(data)

      return data;
    // await persist("authToken", token);
  } catch (error) {
    throw error;
  }
};
export const createUSer = async (body) => {
  try {
    const 
      data = await post(`api/v1/users/create_user`, body);
      console.log(data)

      return data;
    // await persist("authToken", token);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, body) => {
  try {
    const 
      data = await put(`api/v1/user_actions/update_user/${id}`, body);
      console.log(data)

      return data;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (id) => {
  try {
    const 
      data = await deleteFunction(`api/v1/user_actions/delete_user/${id}`);
      console.log(data)

      return data;
  } catch (error) {
    throw error;
  }
};


