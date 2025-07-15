import React from "react";

export type Plant = any

export type FormValues = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  fertilize: boolean;
  fertilizeWeeks: string;
  toggleType: string;
  lastFrostDate: string;
  firstFrostDate: string;
  zipcode: number;
};