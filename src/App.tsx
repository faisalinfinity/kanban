
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./components/Board";
import TaskDetails from "./components/TaskDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
