import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  TEXT_number_1_accessible_name,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "./constants";
import { HandlerClass } from "./Handler";

export interface InputProps {
  history: (string | string[][])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
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
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(0);

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
    if (direction === "up" && historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    } else if (direction === "down" && historyIndex >= 0) {
      setHistoryIndex(historyIndex - 1);
    }

    // Update the current command being displayed
   // setValue(history[history.length - 1 - historyIndex] || "");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    handl.handleInput({
      history,
      setHistory,
      commandString: value,
      scrollHistoryToBottom,
    });

    // Reset history index and input value after submitting
    setHistoryIndex(0);
    setValue("");
  };

  return (
    <div className="new-round">
      <div className="guess-round-current">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Add a form element */}
          <fieldset className="fieldTerminal">
            <legend>Type your command lines here!</legend>
            <ControlledInput
              value={value}
              setValue={setValue}
              ariaLabel={TEXT_number_1_accessible_name}
            />
          </fieldset>
          <div>
            <button
              type="submit"
              className="submitButton"
              aria-label={TEXT_try_button_accessible_name}
            >
              {TEXT_try_button_text}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
