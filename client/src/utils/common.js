export const sliderSettings = {
    slidesPerView  : 1,
    spaceBetween : 50,
    breakpoints : {
        480 : {
            slidesPerView : 1
        },
        600 : {
            slidesPerView : 2
        },
        750 : {
            slidesPerView : 3
        },
        1100 : {
            slidesPerView : 4
        },
    }
}

export const updateFavourites = (id,fav)=>{
    if(fav?.includes(id)){
        return fav.filter((f)=>f!==id)
    }else{ 
        return [...fav,id]
    }
}

export const checkFavourites = (id,favourites) =>{
   return  favourites?.includes(id)? "#fa3e5f":"white"
}

export const validateString = (value) =>{
    return value?.length < 3 || value ===null?"Must have 3 characters":null;
}