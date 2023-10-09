import { match } from "assert";
import React, { useState, Dispatch, SetStateAction } from "react";
import { mainSearchDict } from "./mockedJson";

export function viewTable(data: string): HTMLTableElement {

  const table = document.createElement("table");

  table.append("hello");
  // <table>for each (string[] item: data) {

  //   <tr>item</tr>

  //   }
  //   </table>);
        
//         <table>
//             <tr>
//                 heyyyy
//             </tr>
//         </table>);
    
// 
  return table;
    }