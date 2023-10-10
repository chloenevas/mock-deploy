import React, { Dispatch, SetStateAction } from "react";
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

  handleInput({
    history,
    setHistory,
    commandString,
    scrollHistoryToBottom,
  }: InputProps) {
    var line: string = commandString; // input value from user

    // clear history & reset to brief
    if (commandString === "clear") {
      setHistory([]);
      this.brief = true;
      scrollHistoryToBottom();
      return;
    }

    // switch to whatever mode the user is NOT in
    if (commandString === "mode") {
      this.brief = !this.brief;
      if (this.brief == false) {
        // if verbose mode, add the user's command in verbose mode
        setHistory([...history, line]);
        scrollHistoryToBottom();
      }
    }

    var outputResult: string | string[][] = "";

    // if verbose mode, add "command: " to the input and "output: " to the result
    if (!this.brief) {
      line = "Command: " + line;
      outputResult = "Output: ";
    }

    // if command is load
    if (commandString.includes("load_file")) {
      // value[0] = success or error message
      // value[1] = dicionary that contains parsed csv data
      var values = load(commandString);
      outputResult = outputResult + values[0]; // set output message to success or error
      if (values[1] != null) {
        this.parseData = values[1];
      }
      if (this.brief) {
        // if brief mode, simply display output
        setHistory([...history, outputResult]);
      } else {
        // if verbose mode, display input (line) and output
        setHistory([...history, line, outputResult]);
      }
      scrollHistoryToBottom();
      return;
    }

    // if command is view
    if (commandString === "view") {
      outputResult = outputResult + this.parseData; // outputResult = "Output: " + parseData
      if (this.brief) {
        // if brief mode, simply display output
        setHistory([...history, this.parseData]);
      } else {
        // if verbose mode, display input (line) and output
        setHistory([...history, line, this.parseData]);
      }
      scrollHistoryToBottom();
      return;
    }

    // if command is search
    if (commandString.split(" ")[0] === "search") {
      var searchResult = search(commandString, this.parseData);
      if (this.brief) {
        // if brief mode, simply display results
        setHistory([...history, searchResult]);
      } else {
        // if verbose mode, display input (line) and results
        setHistory([...history, line, searchResult]);
      }
      scrollHistoryToBottom();
      return;
    }
    setHistory([...history, line]);
    scrollHistoryToBottom();
  }
}
