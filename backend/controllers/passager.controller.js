import db from "../config/db.js";
import asyncHandler from "express-async-handler";

export const getPassager = async (req, res, next) => {
  try {
    const result = await db.passager.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPassagerById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await db.passager.findUnique({
      where: {
        id_passager: id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPassager = async (req, res, next) => {
  try {
    const result = await db.passager.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassager = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await db.passager.update({
      where: {
        id_passager: id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePassager = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await db.passager.delete({
      where: {
        id_passager: id,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkCode = asyncHandler(async (req, res, next) => {
  const { phone } = req.body;

  // Recherche dans le modèle Passager
  const passager = await db.passager.findUnique({
    where: {
      telephone_passager: phone,
    },
    include: { account: true },
  });

  // Recherche dans le modèle Conducteur
  const conducteur = await db.conducteur.findUnique({
    where: {
      telephone_conducteur: phone,
    },
    include: { account: true },
  });

  if (!passager && !conducteur) {
    return res
      .status(404)
      .json({ message: "Passager ou Conducteur introuvable" });
  }

  if (passager && passager.account) {
    return res.status(400).json({ message: "Passager a déja un compte" });
  }

  if (conducteur && conducteur.account) {
    return res.status(400).json({ message: "Conducteur a déja un compte" });
  }

  res.status(200).json({ success: true });
});
