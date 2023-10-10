import React, { useState, Dispatch, SetStateAction } from "react";
import { filepathDictionary } from "./mockedJson";

export function load(filePath: string) {
  var trimmedPath = filePath.slice(10);
  console.log(trimmedPath)
  console.log(filepathDictionary.get(trimmedPath));
  var value = filepathDictionary.get(trimmedPath);
  console.log(value);
  if (value !== undefined) {
    return ["success!", value];
  }
  return ["couldn't find file", null];
}
