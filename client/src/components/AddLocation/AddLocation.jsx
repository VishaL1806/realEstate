import React from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { validateString } from "../../utils/common";
import useContries from "../../hooks/useContries";
import Map from "../Map/Map";

const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {
  const { getAll } = useContries();

  const form = useForm({
    initialValues: {
      country: propertyDetails.country,
      city: propertyDetails.city,
      address: propertyDetails.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit =()=>{
    const {hasErrors} = form.validate()
      if(!hasErrors){
          setPropertyDetails((prev)=>({...prev,city,country,address}))
          nextStep()
    }
  }

  return (
    <form
    onSubmit={(e)=>{e.preventDefault();
    handleSubmit()}}
    >
      <div className="flexCenter" style={{"gap":"3rem",marginTop:"3rem",justifyContent:"space-between"}}>
        <div className="flexColStart " style={{"gap":"1rem",flex:1}}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        <div className="flexColStart " style={{"width":"100%",flex:1}}>
            <Map 
            address={address}
            city={city}
            country={country}
             />
        </div>
      </div>

      <Group align="center" mt={"xl"} style={{width:"100%"}} className="flexCenter">
        <Button type="submit" pos={"static"}>Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
