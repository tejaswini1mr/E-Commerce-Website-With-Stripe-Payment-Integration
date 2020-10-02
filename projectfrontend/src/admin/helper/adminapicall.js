//const { API } = require("../../backend");


import {API} from "../../backend"

export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
       
    }
    ).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}
//get all catogory
export const getCategories=()=>{
    return fetch(`${API}/category/`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//products call
export const getallProducts=()=>{
    return fetch(`${API}/products`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
}
//create products

export const createaProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        },body:product


    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};


//delete a products



//get a products
export const getProduct=productId=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//update a product
export const updateProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        },
        body:product


    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};
export const deleteProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        }


    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

export const deleteCategory=(categoryId,userId,token,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        }


    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

export const updateCategory=(CategoryId,userId,token,category)=>{
    return fetch(`${API}/category/${CategoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        },
        body:category
        
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

export const getCategory=categoryId=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}