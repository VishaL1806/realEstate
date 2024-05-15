import React from 'react'
import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput, Textarea, TextInput } from "@mantine/core";
import { validateString } from "../../utils/common";

const BasicDetails = ({prevStep,
    nextStep,
    propertyDetails,
    setPropertyDetails}) => {
        const form = useForm({
            initialValues: {
              title: propertyDetails.title,
              description: propertyDetails.description,
              price: propertyDetails.price,
            },
            validate: {
              title: (value) => validateString(value),
              description: (value) => validateString(value),
              price: (value) => value<1000?"Must be greater than 999 dollars":null,
            },
          });
        
          const { title, description, price } = form.values;
        
          const handleSubmit =()=>{
            const {hasErrors} = form.validate()
              if(!hasErrors){
                  setPropertyDetails((prev)=>({...prev,description,title,price}))
                  nextStep()
            }
          }
        
          return (
            <Box maw="50%" mx="auto" my="md">
            <form
            onSubmit={(e)=>{e.preventDefault();
            handleSubmit()}}
            >
              <div className="flexCenter" style={{"gap":"3rem",marginTop:"3rem",justifyContent:"space-between"}}>
                <div className="flexColStart " style={{"gap":"1rem",flex:1}}>
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    label="Title"
                    placeholder='Property Name'
                    {...form.getInputProps("title")}
                  />
        
                  <Textarea
                    w={"100%"}
                    withAsterisk
                    label="Description"
                    {...form.getInputProps("description")}
                  />
        
                  <NumberInput
                    w={"100%"}
                    withAsterisk
                    label="Price"
                    placeholder='1000'
                    min={0}
                    {...form.getInputProps("price")}
                  />
                </div>
              </div>
        
              <Group align="center" mt={"xl"} style={{width:"100%"}} className="flexCenter">
              <Button variant="default" onClick={prevStep}>Back</Button>
                <Button type="submit" pos={"static"}>Next Step</Button>
              </Group>
            </form>
            </Box>
          );
}

export default BasicDetails