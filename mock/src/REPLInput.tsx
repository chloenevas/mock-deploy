import React, { useState, Dispatch, SetStateAction } from 'react';
import { ControlledInput } from './ControlledInput';
import { TEXT_number_1_accessible_name, TEXT_number_2_accessible_name, TEXT_number_3_accessible_name, TEXT_try_button_accessible_name, TEXT_try_button_text } from './constants';
import { handleInput } from './Handler';
export interface InputProps {
  history: string[],
  setHistory: Dispatch<SetStateAction<string[]>>,
  setNotification: Dispatch<SetStateAction<string>>

}
var brief: Boolean = true
  // You can also mix the interface (as type) with concrete field names, like this:
export function REPLInput({setNotification, history, setHistory}: InputProps) {
    // Remember: let React manage state in your webapp. The current guesses are string fields.
    // You don't always need the <...> annotation, but I like to include it for clarity.
    const [value, setValue] = useState<string>('');
    function handleSubmit(commandString: string) {
      //cons object: handleInput(InputProps: )
    //  const Handler
    var line: string = commandString

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


    return (
      <div className="new-round">
        <div className="guess-round-current"> 
        {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
        
        {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
        <fieldset className='fieldTerminal'>
          <legend>Type your command lines here!</legend>
          <ControlledInput value={value} setValue={setValue} ariaLabel={TEXT_number_1_accessible_name} />
          
        </fieldset>   
        </div>
        <div>
          <button onClick={() => {  
              if(value.length !== 0) {
                setNotification("If Statement Works")
                handleSubmit(value)
              } else {
                setNotification('PLease enter a non-empty text')
              }
            }}
            aria-label={TEXT_try_button_accessible_name}>
            
            {/* The text displayed on the button */}
            {TEXT_try_button_text}
          </button>
        </div>
      </div>
    );  
  }