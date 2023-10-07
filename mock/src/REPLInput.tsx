import React, { useState, Dispatch, SetStateAction, useEffect, EventHandler } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  TEXT_number_1_accessible_name,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "./constants";
import { HandlerClass } from "./Handler";

export interface InputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  setNotification: Dispatch<SetStateAction<string>>;
  scrollHistoryToBottom: () => void;
}

var handl = new HandlerClass();

export function REPLInput({
  setNotification,
  history,
  setHistory,
  scrollHistoryToBottom,
}: InputProps) {
  const [value, setValue] = useState<string>("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentCommand, setCurrentCommand] = useState<string>("");

  const handleyKeyDown = (event: React.KeyboardEvent, commandString: string) => {
    if (event.key === "Enter") {
      handleSubmit(commandString)
    }
  }
  // useEffect to listen for up and down arrow keys and navigate the history
useEffect(() => {
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      navigateHistory("up");
    } else if (event.key === "ArrowDown") {
      navigateHistory("down");
    }
  };

  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keyup", handleKeyUp);
  };
}, [historyIndex]);




const navigateHistory = (direction: "up" | "down") => {
  if (history.length === 0) return;

  if (direction === "up" && historyIndex < history.length - 1) {
    setHistoryIndex(historyIndex + 1);
  } else if (direction === "down" && historyIndex >= 0) {
    setHistoryIndex(historyIndex - 1);
  }

  // Update the current command being displayed
  setCurrentCommand(history[history.length - 1 - historyIndex] || "");
  setValue(currentCommand);
};

  function handleSubmit(commandString: string) {
    handl.handleInput({
      history,
      setHistory,
      commandString,
      scrollHistoryToBottom,
    });

    // Reset history index and input value after submitting
    setHistoryIndex(-1);
    setValue("");
  }

  
  return (
    <div className="new-round">
      <div className="guess-round-current">
        <fieldset className="fieldTerminal">
          <legend>Type your command lines here!</legend>
          <ControlledInput
            value={value}
            setValue={setValue}
            ariaLabel={TEXT_number_1_accessible_name}
          />
        </fieldset>
      </div>
      <div>
        <button
          className="submitButton"
          onClick={() => {
            if (value.length !== 0) {
              handleSubmit(value);
            } else {
              setNotification("Please enter a non-empty text");
            }
          }}
         // onKeyDown={handleSubmit(value)}
          aria-label={TEXT_try_button_accessible_name}
        >
          {TEXT_try_button_text}
        </button>
      </div>
    </div>
  );
}
