import React from 'react';
import REPL from "./REPL";

import './App.css';

/**
 * Top-level application component. Shows the question prompt, and then
 * loads the Puzzle component within it. 
 * @returns JSX for the App component
 */
function App() {
  return (
    <div className="App">
      <p className="App-header" data-testid="test:header-text">
        <div id="Title"> WELCOME TO MOCK! </div>
        <div>
          You can enter commands such as load_file, view, and search. The
          default mode is brief, which returns only the output of your command.
        </div>
        <div>
          You can switch to verbose mode by typing verbose in the command line.
          This will return both your input and your output. Switch back to brief
          at any point by typing brief in the command line. Typing "clear" will
          clear your history and reset the mode to brief.
        </div>
        <div>
          To use... load_file: enter load_file &lt;csv-file-path&gt; search:
          enter search &lt;column&gt; &lt;value&gt;
        </div>
      </p>
      <REPL />
    </div>
  );
}

export default App;
