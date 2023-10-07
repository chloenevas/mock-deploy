import React, { useState, Dispatch, SetStateAction } from "react";
import { ControlledInput } from "./ControlledInput";
import { loadDictionary } from "./constants";

export function load(filePath: string) {
  var trimmedPath = filePath.slice(10);
  console.log(trimmedPath);
  var value = loadDictionary.get(trimmedPath);
  if (value !== undefined) {
    return ["success!", value];
  }
  return ["couldn't find file", null];
}
