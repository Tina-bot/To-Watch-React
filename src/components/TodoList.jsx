import "../assets/styles/TodoList.css";
import { format } from "date-fns";
import { useState, useRef, Fragment } from "react";

const TodoList = () => {
  const [toWatchList, setToWatchList] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const newToWatchRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newToWatchRef.current.value) {
      const toWatchListAdd = {
        id: Math.random().toString(16).slice(2),
        text: newToWatchRef.current.value,
        date: format(new Date(), "yyyy/MM/dd kk:mm:ss"),
        fav: false,
      };
      setToWatchList(toWatchList.concat(toWatchListAdd));
      newToWatchRef.current.value = " ";
      event.target.reset();
    }
  };

  const deleteTask = (id) => {
    const arrayFiltered = toWatchList.filter((item) => item.id !== id);
    setToWatchList(arrayFiltered);
  };

  const handleShowAll = () => {
    setShowAll(() => !showAll);
  };

  const addToFav = (id) => {
    const mutatedToWatchList = [...toWatchList];
    const favIndex = mutatedToWatchList.findIndex((item) => item.id === id);
    mutatedToWatchList[favIndex].fav = !mutatedToWatchList[favIndex].fav;
    setToWatchList(mutatedToWatchList);
  };

  return (
    <>
      <div className="list-main">
        <h2>Series & Movies to watch</h2>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" className="inputTodo" ref={newToWatchRef} />
          <button type="submit"> 📌 </button>
        </form>
        <button
          onClick={handleShowAll}
          className={showAll ? "button-only-fav" : "button-all"}
        >
          {showAll ? "Show Favourites" : "Show All"}
        </button>
        <hr />
        <div className="list">
          <ul>
            {toWatchList
              .filter((item) => {
                if (showAll === true) return item;
                return item.fav === true;
              })
              .map((item) => (
                <Fragment key={item.id}>
                  <li>
                    {item.text}{" "}
                    <button onClick={() => deleteTask(item.id)}> ✔ </button>
                    <button onClick={() => addToFav(item.id)}> ⭐ </button>
                  </li>
                  <small>
                    {item.date} was added ⏱{" "}
                    <small> {item.fav ? "⭐" : ""} </small>{" "}
                  </small>
                </Fragment>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
