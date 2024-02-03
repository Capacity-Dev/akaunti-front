import api from "./config/axiosConfigs"
const ProductModel = {
  get:async function(id){
    const response = await api.request({
      url: `/get`,
      method: "get",
      params: {id}
    })

    return response.data
  },
  create: async function(products){
    const response = await api.request({
      url: `/add-products`,
      method: "POST",
      data: {products}
    })

    return response.data
  },
  update: async function(product){
    const response = await api.request({
      url: `/update-product`,
      method: "POST",
      data: {product}
    })

    return response.data
  },
  search:async function(query){
    const response = await api.request({
      url: `/search-products`,
      method: "get",
      params: {q:query}
    })

    return response.data
  },
  addReceipt: async function(products){
    const response = await api.request({
      url: `/add-receipt`,
      method: "POST",
      data: {products}
    })

    return response.data
  },
  getOverview:async function(query){
    const response = await api.request({
      url: `/overview`,
      method: "get",
    })

    return response.data
  },
  getMostSelled:async function(query){
    const response = await api.request({
      url: `/most-selled`,
      method: "get",
    })

    return response.data
  },
  getLastReceipt:async function(query){
    const response = await api.request({
      url: `/last-receipt`,
      method: "get",
    })
    return response.data
  },
  fetch:async function(){
    const response = await api.request({
      url: `/get-products`,
      method: "get",
    })
    return response.data
  },
  deleteProduct:async function(id){
    const response = await api.request({
      url: `/delete-product`,
      method: "get",
      params:{id}
    })
    return response.data
  },
  getSells:async function(by){
    const response = await api.request({
      url: `/get-sells`,
      method: "get",
      params:{by}
    })
    return response.data
  },
  getConfigs:async function(){
    const response = await api.request({
      url: `/get-config`,
      method: "get"
    })
    return response.data
  },
  saveConfigs:async function(data){
    const response = await api.request({
      url: `/save-config`,
      method: "POST",
      data:data
    })
    return response.data
  },
  importCSV: async function (data){
    const response = await api.request({
      url: `/import`,
      method: "POST",
      data: {data}
    })
    return response.data
  },
  export:async function(by){
    const response = await api.request({
      url: `/export`,
      method: "get",
      responseType: 'blob'
    })
    return response.data
  },
  fetchByBarcode:async function(barcode){
    const response = await api.request({
      url: `/get`,
      method: "get",
      params: {barcode}
    })
    return response.data
  },
  saveBill: async function(data){
    const response = await api.request({
      url: `/save-bill`,
      method: "POST",
      data: data
    })

    return response.data
  }
}

export default ProductModel
