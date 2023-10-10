//import "../styles/main.css";

interface HistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: (string | string[][])[];
}

export function History(props: HistoryProps) {
  return (
    <div className="history">
      {props.history.map((command) => {
        if (typeof command === "string") {
          return <p>{command}</p>;
        } else {
          return (
            <table>
              <tbody>
                {command.map((row) => (
                  <tr>
                    {row.map((item) => (
                      <td>{item}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
      })}
    </div>

    // <div className="history">
    //   {props.history.map((command, index) => (
    //     <div dangerouslySetInnerHTML={{ __html: command }}  />
    //   ))}
    // </div>
  );
}
