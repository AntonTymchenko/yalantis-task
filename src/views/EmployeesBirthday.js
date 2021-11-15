import React from "react";
import monthNames from "../utils/month";
import "./EmployeesBirthday.css";

const EmployeesBirthday = ({ activeId, emploList }) => {
  const listOfChekedEmployees = [];

  const createDate = (string) => {
    const date = string.slice(0, 10).split("-").reverse();
    const month = monthNames[+date[1] - 1];

    return `${date[0]} ${month}, ${date[2]} year`;
  };

  const compareAndSort = (activeId, emploList) => {
    emploList.forEach((item) => {
      activeId.forEach((idEmployees) => {
        if (item.id === idEmployees) {
          listOfChekedEmployees.push(item);
        }
      });
    });

    listOfChekedEmployees.sort((prev, next) => prev.lastName - next.lastName);

    return listOfChekedEmployees;
  };

  compareAndSort(activeId, emploList);

  const currentMonth = () => {
    const date = new Date();
    const month = monthNames[date.getMonth()];
    return month;
  };

  const chanchingYearToCurrentMonth = () => {
    const month = new Date().getMonth();
    const newYear = [...monthNames];
    const firstPart = [...newYear.slice(month)];
    const secondPart = [...newYear.slice(0, month)];
    return [...firstPart, ...secondPart];
  };

  return (
    <div className="birthPart">
      <h3>Employees birthday</h3>
      <p>Current month: {currentMonth()}</p>
      <ul>
        {listOfChekedEmployees.length === 0 ? (
          <li key="1">Employees List is empty</li>
        ) : (
          chanchingYearToCurrentMonth().map((month) => {
            return (
              <li key={month}>
                <p className="month">{month}</p>
                <ul>
                  {!listOfChekedEmployees.some((item) =>
                    createDate(item.dob).includes(month)
                  ) ? (
                    <p>No employees</p>
                  ) : (
                    listOfChekedEmployees.map((item) => {
                      if (createDate(item.dob).includes(month)) {
                        return (
                          <li key={item.id}>
                            <p>
                              <span>{item.lastName}</span>{" "}
                              <span>{item.firstName}</span> -
                              <span>{createDate(item.dob)}</span>
                            </p>
                          </li>
                        );
                      }
                      return null;
                    })
                  )}
                </ul>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default EmployeesBirthday;

// listOfChekedEmployees.map((item) => (
//   <li key={item.id}>
//     <p>
//       <span>{item.lastName}</span> <span>{item.firstName}</span> -
//       <span>{createDate(item.dob)}</span>
//     </p>
//   </li>
// ))
