//import "../styles/main.css";

interface HistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[]
}
export function History(props: HistoryProps) {
  return (
    <div className="history">
      <table>
        {props.history.map((command, index) => (
          <tr>
            <td>{command}</td>
          </tr>
        ))}
      </table>
    </div>

    // <div className="history">
    //   {props.history.map((command, index) => (
    //     <div dangerouslySetInnerHTML={{ __html: command }}  />
    //   ))}
    // </div>
  );
}
