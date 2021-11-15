import "../views/Employees.css";

const Employees = ({ emploList, setActiveId, activeId }) => {
  const arr_EN = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
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
    const arr = [];

    for (let i = 0; i < arr_EN.length; i += 1) {
      arr.push(
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
                              defaultChecked={isChecked(id) ? true : false}
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
                              defaultChecked={isChecked(id) ? true : false}
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
    return arr;
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
