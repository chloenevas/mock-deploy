import React, { useState, Dispatch, SetStateAction } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  TEXT_number_1_accessible_name,
  TEXT_number_2_accessible_name,
  TEXT_number_3_accessible_name,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "./constants";

export interface InputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  commandString: string;
}
var brief: Boolean = true;
// You can also mix the interface (as type) with concrete field names, like this:
export function handleInput({history, setHistory, commandString}: InputProps) {
  // Remember: let React manage state in your webapp. The current guesses are string fields.
  // You don't always need the <...> annotation, but I like to include it for clarity.

  function handler() {
    var line: string = commandString;
    if (commandString === "clear") {
      setHistory([]);
      brief = true;
      return;
    }

    if (commandString === "verbose") {
      brief = false;
      setHistory([...history, line]);
      return;
    } else if (commandString === "brief") {
      brief = true;
    }

    if (!brief) {
      var input: string = "Command: " + line;
      var output: string = "Output: " + "need to do this part";
      setHistory([...history, input, output]);
      return;
    }
    setHistory([...history, line]);
  }
}