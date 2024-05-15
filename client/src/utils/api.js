import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

export const api = axios.create({
    baseURL : "http://localhost:8000/api"
})


export const getAllProperties = async () =>{
    try {
        const response = await api.get('/residency/getAllresidencies',{
            timeout : 10*1000
        }) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong!!")
        throw error
    }
}

export const getProperty = async (id) =>{
    try {
        const response = await api.get(`/residency/getResidency/${id}`,{
            timeout : 10*1000
        }) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong!!")
        throw error
    }
}

export const createUser = async (email,token) =>{
    try {
        const response = await api.post(`/user/register`,{
           email
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong!!")
        throw error
    }
}

export const bookVisit = async (date,id,email,token) =>{
    try {
        const response = await api.post(`user/bookVisit/${id}`,{
            id,
            date,
            email
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        toast.success("Booked Succesfully")
        return response.data
    } catch (error) {
        toast.error(error.response.data.message??"Something went wrong !!")
        throw error
    }
}

export const cancelBooking = async (email,id,token) =>{
    try {
        const response = await api.post(`user/removebooking/${id}`,{
            email
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        toast.success("Booked Succesfully")
        return response.data
    } catch (error) {
        toast.error(error.response.data.message??"Something went wrong !!")
        throw error
    }
}

export const toFav = async (email,id,token) =>{
    try {
        const response = await api.post(`user/toFav/${id}`,{
            email
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        toast.success("Succesfully")
        return response.data
    } catch (error) {
        toast.error("Something went wrong !!")
        throw error
    }
}

export const allBookings = async (email,token) =>{
    if(!token) return [];
    try {
        const response = await api.post(`user/allBookings`,{
            email
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        return response.data.bookedVisits
    } catch (error) {
        throw error
    }
}

export const allFavourites = async (email,token) =>{
    if(!token) return [];
    try {
        const response = await api.post(`user/getAllFavourites`,{
            email
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        return response.data.allfavs
    } catch (error) {
        throw error
    }
}

export const createResidency = async (propertyDetails,token) =>{
    if(!token) return [];
    try {
        const response = await api.post(`residency/create`,{
            data : propertyDetails
        },{headers : {
            Authorization : `Bearer ${token}`
        }}) ;

        if(response.status===400 || response.status===500){
            throw response.data
        }
        
    } catch (error) {
        throw error
    }
}
