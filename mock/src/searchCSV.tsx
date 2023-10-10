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

  var header: string = "";
  var value = "";

  if (searchComps.length == 2) {
      header = (searchComps[0]).toLowerCase();
      if (header[0] == '"' && header[header.length - 1] == '"') {
        header = (header.substring(1, header.length - 1)).toLowerCase();
      }
    header = header + ",";
    value = searchComps[1].toLowerCase();
  }
  else if (searchComps.length == 1) {
    header = "";
    value = searchComps[0].toLowerCase();
  }
  if (value[0] == '"' && value[value.length - 1] == '"') {
    value = value.substring(1, value.length - 1);
  }

  var specificDict = mainSearchDict.get(data);
  if (specificDict == undefined) {
    return "Please Load a File First!";
  }
  var response: string = specificDict.get(header + value);
  console.log(header + value)
  if (response == undefined) {
    return "value was not found";
  }


  // return convertToTable(response);
  return response;

}
//   function convertToTable(value: string[][]) {
//     <table>
//         for each (string[] item: value) {
//         <tr>
//           item
//           </tr> 
//         }
//     </table>
//   }