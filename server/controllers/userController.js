import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a User");

  let { email } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email: email } });
  console.log("got user data");
  if (!userExist) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered Succesfully",
      user: user,
    });
  }
  res.status(201).send({ message: "user already registered " });
  console.log(email);
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, date } = req.body;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).send({ message: "Already booked by you.!🤦‍♂️" });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });

      res.send({ message: "your visit is booked succesfully..😁" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went Wrong." });
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const allbookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (allbookings) {
      // let bookings = allbookings[0].bookedVisits
      res.send({
        message: "got all booking succesfully",
        bookedVisits: allbookings.bookedVisits,
      });
    }
    res.status(204).send({ message: "no booking found on your behalf!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: { bookedVisits: user.bookedVisits },
      });

      res.status(201).json({ message: "booking cancelled succesfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user.favResidenciesID.includes(rid)) {
      const updateuser =  await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.status(201).json({ message: "removed from favourites successfully", updateuser });
    } else {
      await prisma.user.update({
        where: { email },
        data: { favResidenciesID: { push: rid } },
      });
      res.status(201).json({ message: "added to  favourites successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export const getAllFav = asyncHandler(async(req,res)=>{
  const {email} = req.body
  try {
    const allfavs = await prisma.user.findUnique({
      where : {email},
      select  :{favResidenciesID : true}
    })
    if (allfavs) {
      res.status(200).send({allfavs : allfavs.favResidenciesID})
    }else{
      res.status(203).json({message : "no favs "})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

