import { useState, useEffect } from "react";
import EmployeesBirthday from "./views/EmployeesBirthday";
import "./App.css";

import fetchEmployess from "./service/employees-api";
import Employees from "./views/Employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(
    JSON.parse(localStorage.getItem("activeId")) || []
  );

  useEffect(() => {
    const fetchEmployeesList = () => {
      fetchEmployess()
        .then((data) => {
          data.sort((prev, next) => {
            if (prev.firstName > next.firstName) return 1;
            if (prev.firstName < next.firstName) return -1;
            return 0;
          });
          setEmployees((state) => [...state, ...data]);
        })
        .catch((err) => {
          setError(err);
          console.log(error);
        });
    };

    fetchEmployeesList();
  }, [error]);
  useEffect(() => {
    localStorage.setItem("activeId", JSON.stringify(activeId || []));
    localStorage.setItem("employees", JSON.stringify(employees || []));
  }, [activeId, employees]);

  return (
    <div className="mainSection">
      <Employees
        emploList={employees}
        setActiveId={setActiveId}
        activeId={activeId}
      />
      <EmployeesBirthday activeId={activeId} emploList={employees} />
    </div>
  );
}

export default App;
