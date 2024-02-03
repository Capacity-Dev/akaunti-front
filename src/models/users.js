import api from "./config/axiosConfigs"
const UserModel = {
  get:async function(id){
    const response = await api.request({
      url: `/get-user`,
      method: "GET",
      params: {id}
    })

    return response.data
  },
  login:async function(user){
    const response = await api.request({
      url: `/login`,
      method: "POST",
      data: user
    })

    return response.data
  },
  create: async function(user){
    const response = await api.request({
      url: `/add-user`,
      method: "POST",
      data: user
    })

    return response.data
  },
  update: async function(user){
    const response = await api.request({
      url: `/update-user`,
      method: "POST",
      data: user
    })

    return response.data
  },
  delete:async function(id){
    const response = await api.request({
      url: `/delete-user`,
      method: "GET",
      params: {id}
    })

    return response.data
  },
  search:async function(query){
    const response = await api.request({
      url: `/search-user`,
      method: "GET",
      params: {q:query}
    })

    return response.data
  },
  
  getOverview:async function(query){
    const response = await api.request({
      url: `/overview`,
      method: "GET",
    })

    return response.data
  },
  fetch:async function(){
    const response = await api.request({
      url: `/get-users`,
      method: "GET",
    })
    return response.data
  },
  deleteUser:async function(id){
    const response = await api.request({
      url: `/delete-user`,
      method: "GET",
      params:{id}
    })
    return response.data
  },
  export:async function(){
    const response = await api.request({
      url: `/export-users`,
      method: "GET",
      responseType: 'blob'
    })
    return response.data
  },
}

export default UserModel
