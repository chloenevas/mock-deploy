import { match } from "assert";
import React, { useState, Dispatch, SetStateAction } from "react";
import { mainSearchDict } from "./mockedJson";

export function search(input: string, data: string) {
  var search = input.slice(7);
  var searchComps: string[] = [];
  const matches: RegExpMatchArray | null = search.match(
    /(".*?"|[^"\s]+)+(?=\s*|\s*$)/g
  );

  if (matches !== null) {
    searchComps = matches;
  }
  var header = searchComps[0];

  if (header[0] == '"' && header[header.length - 1] == '"') {
    header = header.substring(1, header.length - 1);
  }

  var value = searchComps[1];
  if (value[0] == '"' && value[value.length - 1] == '"') {
    value = value.substring(1, value.length - 1);
  }

  var specificDict = mainSearchDict.get(data);
  console.log(mainSearchDict.get(data));
  if (specificDict == undefined) {
    return "Please Load a File First!";
  }
  value = specificDict.get(value);
  if (value == undefined) {
    return "value was not found";
  }

  // if (header.toLowerCase() == "none") {
  //   var result = specificDict.get(value);
  // } else {
  //   try {
  //     parseInt(header);
  //     //  result =
  //   } catch {}
  // }

  function convertToTable(value: string[][]) {
    <table>
      <tr>
        
      </tr>
    </table>
  }
  return value;
}
