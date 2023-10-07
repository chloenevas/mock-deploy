import React, { useState, Dispatch, SetStateAction } from "react";
import { load } from "./loadCSV";

export interface InputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
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
      this.brief = true;
      scrollHistoryToBottom();
      return;
    }

    if (commandString === "verbose") {
      this.brief = false;
      setHistory([...history, line]);
      scrollHistoryToBottom();
      return;
    } else if (commandString === "brief") {
      this.brief = true;
    }

    if (!this.brief) {
      var input: string = "Command: " + line;
      var outputResult: string = "need to do this part";
      if (commandString.includes("load_file")) {
        var values = load(commandString);
        outputResult = values[0];
        if (values[1] != null) {
          this.parseData = values[1];
        }
      }
      if (commandString === "view") {
        outputResult = this.parseData;
      }
      var output: string = "Output: " + outputResult;
      setHistory([...history, input, output]);
      scrollHistoryToBottom();
      return;
    }
    setHistory([...history, line]);
    scrollHistoryToBottom();
  }
}
