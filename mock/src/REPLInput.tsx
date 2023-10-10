import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  TEXT_input_box,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "./constants";
import { HandlerClass } from "./Handler";

/**
 * Props for history & scrolling and notification 
 */
export interface InputProps {
  history: (string | string[][])[];
  setHistory: Dispatch<SetStateAction<(string | string[][])[]>>;
  setNotification: Dispatch<SetStateAction<string>>;
  scrollHistoryToBottom: () => void;
}

var handl = new HandlerClass();

/**
 * 
 * @param InputProps that include history, seHistory, setNotification, and scrollHistoryToBottom
 * @returns the command line box and the submit button
 */
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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          {" "}
          <fieldset>
            <legend>Type your command lines here!</legend>
            <ControlledInput
              value={value}
              setValue={setValue}
              ariaLabel={TEXT_input_box}
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
