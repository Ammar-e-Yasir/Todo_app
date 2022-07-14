import React, { useEffect, useState, useReducer } from "react";

// const getItem = ()=>{
//     const item = localStorage.getItem('list');
//     if(!item){
//         return [];

//     }
//     else{
//         return JSON.parse(item);
//     }
// }

const data = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      //   console.log(action.payload)
      let dataClone = state.slice(0);
      dataClone.push(action.payload);
      console.log(dataClone);

      return [...dataClone];
    }
    case "DELETE_TODO": {
      const updateTodoList = state.filter((ele, index) => {
        return ele.id != action.payload;
      });

      return [...updateTodoList];
    }

    case "UPDATED_TODO": {
      let updatedState = state.map((e) => {
        if (e.id === action.payload.id) {
          return { ...e, item: action.payload.item };
        } else {
          return e;
        }
      });

      return [...updatedState ];
    }

    default:
      return state;
  }
};

function Todo() {
  const [val, setVal] = useState("");
  const [todoList, setTodoList] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const [btnToggle, setBtnToggle] = useState(true);
  const [editId, setEditId] = useState(null);

  const [state, dispatch] = useReducer(reducer, data);

  // useEffect(()=>{
  //     localStorage.setItem('list', JSON.stringify(todoList))
  // },[todoList])

  const addTodo = () => {
    if (!val) {
      alert("Fill the data !");
    } else if (val && !btnToggle) {
      dispatch({ type: "UPDATED_TODO", payload: { item: val, id: editId } });
      setBtnToggle(true)
    //   setTodoList(
    //     todoList.map((e) => {
    //       if (e.id == editId) {
    //         return { ...e, item: val };
    //       }

    //       return e;
    //     })
    //   );
      setVal("");
    } else {
      const newItem = { id: new Date().getTime().toLocaleString(), item: val };
      dispatch({ type: "ADD_TODO", payload: newItem });
      // setTodoList([...todoList , newItem]);
      setVal("");
    }
  };

  const editItem = (id) => {
    let editValue = state.find((e) => {
      return e.id === id;
    });

    setVal(editValue.item);
    setBtnToggle(false);
    setEditId(id);
  };

  const delItem = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });

    // const updateTodoList = todoList.filter((item , index)=>{

    //     return ind != index
    // })

    // setTodoList(updateTodoList);
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
          {/* <button onClick={addTodo} >Add</button> */}
        </div>
      </div>
      {state.map(({ item, id }, index) => {
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
