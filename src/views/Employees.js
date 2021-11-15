import React from "react";
import arr_EN from "../utils/abc";
import "../views/Employees.css";

const Employees = ({ emploList, setActiveId, activeId }) => {
  const onSubmitButtons = (event) => {
    if (event.target.value === "no active") {
      const indx = activeId.findIndex((item) => item === event.target.name);
      if (indx === -1) {
        return;
      }
      activeId.splice(indx, 1);
      setActiveId(() => [...activeId]);
    }
    if (event.target.value === "active") {
      if (activeId.some((id) => id === event.target.name)) {
        return;
      }
      setActiveId((prevId) => [...prevId, event.target.name]);
    }
  };
  const isChecked = (id) => {
    return activeId.some((item) => item === id);
  };

  const itemOfList = () => {
    const arrOfEmployeesList = [];

    for (let i = 0; i < arr_EN.length; i += 1) {
      arrOfEmployeesList.push(
        <li key={arr_EN[i]} className="mainListItem">
          {
            <ul className="secondList">
              {!emploList.some(
                ({ firstName }) => firstName[0] === arr_EN[i]
              ) ? (
                <li key="12">«No Employees»</li>
              ) : (
                emploList.map(({ id, firstName, lastName }) => {
                  if (arr_EN[i] === firstName[0]) {
                    return (
                      <li key={id}>
                        <p className={isChecked(id) ? "highlighted" : "usual"}>
                          {firstName}
                        </p>
                        <p className={isChecked(id) ? "highlighted" : "usual"}>
                          {lastName}
                        </p>
                        <form className="form">
                          <label>
                            no active
                            <input
                              type="radio"
                              name={`${id}`}
                              value="no active"
                              defaultChecked={isChecked(id) ? false : true}
                              onChange={(e) => {
                                if (isChecked(id)) {
                                  e.target.checked = false;
                                } else {
                                  e.target.checked = true;
                                }
                              }}
                              onClick={(event, id) =>
                                onSubmitButtons(event, id)
                              }
                            />
                          </label>
                          <label>
                            active
                            <input
                              type="radio"
                              name={`${id}`}
                              value="active"
                              defaultChecked={!isChecked(id) ? false : true}
                              onChange={(e) => {
                                if (!isChecked(id)) {
                                  e.target.checked = true;
                                } else {
                                  e.target.checked = false;
                                }
                              }}
                              onClick={(event, id) =>
                                onSubmitButtons(event, id)
                              }
                            />
                          </label>
                        </form>
                      </li>
                    );
                  }
                  return null;
                })
              )}
            </ul>
          }
        </li>
      );
    }
    return arrOfEmployeesList;
  };
  return (
    <div className="leftSide">
      <ol type="A" className="mainList">
        {itemOfList()}
      </ol>
    </div>
  );
};

export default Employees;
