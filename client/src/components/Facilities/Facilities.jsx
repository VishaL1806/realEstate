import React, { useContext } from "react";
import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties";
import { useMutation } from "react-query";
import {toast} from 'react-toastify'
import { createResidency } from "../../utils/api";
import {useAuth0} from '@auth0/auth0-react'

const Facilities = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
  setActiveStep,
setOpened
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have atleast one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have atleast one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { parkings, bedrooms, bathrooms },
      }));
      mutate();

    }
  };

  // =========== upload logic ===================/

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency({
        ...propertyDetails,
        facilities: { parkings, bedrooms, bathrooms },userEmail : user?.email
      },token),
      onError : ({response}) => toast.error(response.data.message,{position:'bottom-right'}),
      onSettled : ()=>{
        toast.success("Added Succesfully",{position:'bottom-right'})
        setPropertyDetails({
            title: "",
            description: "",
            price: 0,
            country: "",
            city: "",
            address: "",
            image: null,
            facilities: {
              bedrooms: 0,
              parkings: 0,
              bathrooms: 0,
            },
            userEmail: user?.email,
          })
          setOpened(false)
          setActiveStep(0)
          refetchProperties()
      }
  });

  return (
    <Box maw="30%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div
          className="flexCenter"
          style={{
            gap: "3rem",
            marginTop: "3rem",
            justifyContent: "space-between",
          }}
        >
          <div className="flexColStart " style={{ gap: "1rem", flex: 1 }}>
            <NumberInput
              w={"100%"}
              withAsterisk
              label="No of Bedrooms"
              min={0}
              {...form.getInputProps("bedrooms")}
            />

            <NumberInput
              w={"100%"}
              withAsterisk
              label="No of Parkings"
              min={0}
              {...form.getInputProps("parkings")}
            />

            <NumberInput
              w={"100%"}
              withAsterisk
              label="No of Bathrooms"
              min={0}
              {...form.getInputProps("bathrooms")}
            />
          </div>
        </div>

        <Group
          align="center"
          mt={"xl"}
          style={{ width: "100%" }}
          className="flexCenter"
        >
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
           {isLoading?"Submitting":"Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
