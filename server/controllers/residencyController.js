import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({
      message: "Residency Created succesfully",
      residency,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with same address already exists..");
    }
    throw new Error(error.message);
  }
});

export const getAllresidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residencies = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});
