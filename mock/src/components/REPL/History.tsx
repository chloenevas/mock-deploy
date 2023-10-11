interface HistoryProps {
  history: (string | string[][])[];
}

/**
 * Loops through the history to return each element
 * as either a paragraph if it's a string, or an HTML table
 * if it's a list of list of strings
 *
 * @param props - HistoryProps that contains the history list
 * @returns - element of history properly formatted
 */
export function History(props: HistoryProps) {
  return (
    <div className="history">
      {props.history.map((entry) => {
        if (typeof entry === "string") {
          return <p>{entry}</p>;
        } else {
          return (
            <div>
              <p>Output:</p>
              <table>
                <tbody>
                  {entry.map((row) => (
                    <tr>
                      {row.map((item) => (
                        <td>{item}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      })}
    </div>
  );
}
