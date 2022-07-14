const initialTodo = [];




const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TODO":{
          let todoClone = initialTodo.slice(0);
          todoClone.push(action.payload)
        return [...initialTodo,todoClone];
      }
        case "DELETE_TODO":{

            const updateTodoList = initialTodo.filter((ele , index)=>{

                return ele.id != action.payload
            })
          
        return [updateTodoList]
        }


        case "UPDATED_TODO":{

            let editValue = initialTodo.find((e)=>{
                return e.id === action.payload;
            })
    
          
        return [updateTodoList]
        }




      default:
        return state;
    }
  };