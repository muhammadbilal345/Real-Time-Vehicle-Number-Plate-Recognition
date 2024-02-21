
import axios from 'axios';

const usersUrl = 'http://localhost:9002/view';
const editUrl = 'http://localhost:9002/edit';
const LogUrl = 'http://localhost:9002/view_log';

export const getUsers = async (_id) => {
  _id = _id || '';
  return await axios.get(`${usersUrl}/${_id}`);
};
//log

export const getLog = async (id) => {
  try {
    return await axios.get(`${LogUrl}/${id}`);
  } catch (error) {
    console.log("ERROR while calling getLog api", error);
    throw error;
  }
};


export const getUser = async (id) => {
  try {
    return await axios.get(`${editUrl}/${id}`);
  } catch (error) {
    console.log("ERROR while calling getUser api", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const editUser = async (user, id) => {
  try {
    return await axios.put(`${editUrl}/${id}`, user);
  } catch (error) {
    console.log("ERROR while calling editUser api", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const deleteUser = async (id) => {
  return await axios.delete(`${usersUrl}/${id}`);
};

// import axios from 'axios';
// const usersUrl = 'http://localhost:9002/view';
// const editUrl = 'http://localhost:9002/edit';

// export const getUsers = async (_id) => {
//     _id =  _id || '';
//     return await axios.get(`${usersUrl}/${_id}`);
// }
// // export const deleteUser = async (id) => {
// //     return await axios.delete(`${usersUrl}/${id}`);
// // }

// export const getUser =async(id)=>{
//     try{
// return await axios.get(`${editUrl}/${id}`)

//     }catch(error){
// console.log("ERROR while calling getUser api",error)
//     }
// }
// export const editUser = async ( user,id) => {
//     try{
//         return await axios.put(`${editUrl}/${id}`, user)
//             }catch(error){
//         console.log("ERROR while calling getUser api",error)
//             }
   
// }
// export const deleteUser = async (id) => {
//     return await axios.delete(`${usersUrl}/${id}`);
// }
// // const logUrl = 'http://localhost:9002/view_log';
// // export const usersLog = async (_id) => {
// //     _id =  _id || '';
// //     return await axios.get(`${logUrl}/${_id}`);
// // }
