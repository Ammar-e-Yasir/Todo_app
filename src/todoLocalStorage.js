import React, { useEffect, useState, useReducer } from "react";

const getItem = ()=>{
    const item = localStorage.getItem('list');
    if(!item){
        return [];

    }
    else{
        return JSON.parse(item);
    }
}

console.log(getItem())
function Todo() {
  const [val, setVal] = useState("");
  const [todoList, setTodoList] = useState(getItem());
  const [btnToggle, setBtnToggle] = useState(true);
  const [editId, setEditId] = useState(null);

  const [state, dispatch] = useReducer(reducer, data);


  useEffect(()=>{
      setTodoList('a')
  },[])


  useEffect(()=>{
      localStorage.setItem('list', JSON.stringify(todoList))
    },[todoList])

  const addTodo = () => {
    if (!val) {
      alert("Fill the data !");
    } else if (val && !btnToggle) {
      setTodoList(
        todoList.map((e) => {
          if (e.id == editId) {
            return { ...e, item: val };
          }

          return e;
        })
        );
      setBtnToggle(true)
      setVal("");
    } else {
      const newItem = { id: new Date().getTime().toLocaleString(), item: val };
      setTodoList([...todoList , newItem]);
      setVal("");
    }
  };

  const editItem = (id) => {
    let editValue = todoList.find((e) => {
      return e.id === id;
    });

    setVal(editValue.item);
    setBtnToggle(false);
    setEditId(id);
  };

  const delItem = (id) => {

    const updateTodoList = todoList.filter((item)=>{

        return id != item.id
    })

    setTodoList(updateTodoList);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <input
            type="text"
            onChange={(e) => setVal(e.target.value)}
            value={val}
          />
        </div>
        <div className="btn">
          {btnToggle ? (
            <button onClick={addTodo}>Add</button>
          ) : (
            <button onClick={addTodo}>update</button>
          )}
        </div>
      </div>
      {todoList.map(({ item, id }, index) => {
        return (
          <div style={{}} key={index}>
            <p>{item}</p>
            <button
              onClick={() => {
                delItem(id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                editItem(id);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
