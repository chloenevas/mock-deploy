import React, { useState, Dispatch, SetStateAction } from "react";
import { load } from "./loadCSV";
import { search } from "./searchCSV";


export interface InputProps {
  history: (string | string[][])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
  commandString: string;
  scrollHistoryToBottom: () => void;
}
export class HandlerClass {
  brief: Boolean = true;
  parseData: string = "No Files Have Been Parsed";
  constructor() {}

  // You can also mix the interface (as type) with concrete field names, like this:
  handleInput({
    history,
    setHistory,
    commandString,
    scrollHistoryToBottom,
  }: InputProps) {
    // Remember: let React manage state in your webapp. The current guesses are string fields.
    // You don't always need the <...> annotation, but I like to include it for clarity.
    var line: string = commandString;

    if (commandString === "clear") {
      setHistory([]);
      this.brief = false;
      scrollHistoryToBottom();
      return;
    }

    if (commandString === "mode") {
      this.brief = !this.brief;
      if (this.brief == false) {
         setHistory([...history, line]);
         scrollHistoryToBottom();
      }
    }
    // if (commandString === "verbose") {
    //   this.brief = false;
    //   setHistory([...history, line]);
    //   scrollHistoryToBottom();
    //   return;
    // } else if (commandString === "brief") {
    //   this.brief = true;
    // }
    var outputResult: string | string[][] = "";
    if (!this.brief) {
      line = "Command: " + line;
      outputResult = "Output: ";
    }

    if (commandString.includes("load_file")) {
      var values = load(commandString);
      outputResult = outputResult + values[0];
      if (values[1] != null) {
        this.parseData = values[1];
      }
      var output: string = outputResult;
      if (this.brief) {
        setHistory([...history, output]);
      } else {
        setHistory([...history, line, output]);
      }
      scrollHistoryToBottom();
      return;
    }
    if (commandString === "view") {
      outputResult = outputResult + this.parseData;
      console.log(outputResult);
      console.log(this.parseData)
      if (this.brief) {
        setHistory([...history, this.parseData]);
      } else {
        setHistory([...history, line, this.parseData]);
      }
      scrollHistoryToBottom();
      return;
    }
    if (commandString.split(" ")[0] === "search") {
      var searchValue = search(commandString, this.parseData);
      var output: string = searchValue;
      if (this.brief) {
        setHistory([...history, output]);
      } else {
        setHistory([...history, line, output]);
      }

      scrollHistoryToBottom();
      return;
    }
    //if ()
    setHistory([...history, line]);
    scrollHistoryToBottom();
  }
}
