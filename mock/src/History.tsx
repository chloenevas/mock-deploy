//import "../styles/main.css";

interface HistoryProps {
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
  );
}
