import { RequestHandler } from "express";

import { ApiKey, User } from "models";

export const create: RequestHandler = async ({ user, ...req }, res) => {
  if (!user) return res.status(400).send();
  await ApiKey.query().insert({ userId: user.id });
  return res.status(201).send();
};

export const modify: RequestHandler = async ({ user, ...req }, res) => {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send();
  const apiKey = await ApiKey.query().where({
    id: req.query.id,
    userId: user.id,
  });
  if (!apiKey.length) return res.status(404).send();
  ApiKey.query().findById(req.query.id).patch(req.params);
  return res.status(200).send();
};

export const logs: RequestHandler = async (req, res) => {
  return res.status(200).send();
};