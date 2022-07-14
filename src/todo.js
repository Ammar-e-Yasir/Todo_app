import React, { useEffect, useState } from "react";
import './main.css';

const getItem = ()=>{
    const item = localStorage.getItem('list');
    if(!item){
        return [];

    }
    else{
        return JSON.parse(item);
    }
}

console.log(localStorage.getItem('list')) 

function Todo() {
  const [val, setVal] = useState("");
  const [todoList, setTodoList] = useState(getItem());
  const [btnToggle, setBtnToggle] = useState(true);
  const [editId, setEditId] = useState(null);
  const [clearBtn , setClearBtn] = useState(false)


  useEffect(()=>{
      localStorage.setItem('list', JSON.stringify(todoList));
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
      setClearBtn(true)
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


  const removeData = ()=>{
    setTodoList([])
  }







  return (
    <div className='parent-section'>
      <div className="child-section">
        <h1>Todo List App</h1>
      <div className="input-div">
          <input
            type="text"
            onChange={(e) => setVal(e.target.value)}
            value={val}
            placeholder={'Add Items...!'}
          />
          {btnToggle ? (
            <i class="fas fa-plus " onClick={addTodo}></i>
          ) : (
            <i class="fas fa-edit " onClick={addTodo}></i>
          )}
      </div>
      <div className="fetch-Item">
      {todoList.map(({ item, id }, index) => {
        return (
          <div className="fetch-list" key={index}>
            <p>{item}</p>
 
           <div>
           <i class="fas fa-edit" onClick={()=>{editItem(id)}}></i>
           <i class="fas fa-trash" onClick={()=>{delItem(id)}}></i>
           </div>
          </div>
        );
      })}

</div>


{
  clearBtn ?(
  
  <div className="data-remove-btn">
  <button onClick={removeData}>Clear All</button>
  </div>
  ):null
}

















</div>
    </div>
  );
}

export default Todo;
