import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Group } from "@mantine/core";
import "./UploadImage.css";

const UploadImage = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {

  const [imageURL, setImageURL] = useState(propertyDetails.image);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName : "defbferq8",
            uploadPreset : "eupeurty",
            maxFiles : 1
        },(err,result)=>{
            if(result.event==="success"){
                setImageURL(result.info.secure_url)
            }
        })
    },[])

    const handleNext = ()=>{
        setPropertyDetails((prev)=>({...prev,image:imageURL}))
        nextStep();
    }
    

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div className="flexColCenter uploadZone" onClick={()=> widgetRef.current?.open()} >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage" onClick={()=> widgetRef.current?.open()}>
          <img src={imageURL} alt="" />
        </div>
      )}

<Group align="center" mt={"xl"} style={{width:"100%"}} className="flexCenter">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button  onClick={handleNext} disabled={!imageURL}>Next Step</Button>
      </Group>
    </div>
  );
};

export default UploadImage;
