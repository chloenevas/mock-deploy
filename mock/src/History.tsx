//import "../styles/main.css";

interface HistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[]
}
export function History(props: HistoryProps) {
  return (
    <div className="history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {/* CHANGED */}
      {props.history.map((command, index) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
