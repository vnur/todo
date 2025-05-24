import { useReducer } from "react";

export const Todo = () => {
  const initialData = {
    inputData: "",
    data: [],
    editingIndex:null
  };

    const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return { ...state, inputData: action.payload };
        
        case "submit":
          if(state.inputData.trim()==="")return {...state}
          if(state.editingIndex !==null){
            const updatedData = state.data
            updatedData[state.editingIndex]=state.inputData
            return{...state, inputData:"",editingIndex:null}
          }
          return {
          ...state,
          data: [...state.data, state.inputData],
          inputData: "",
        };

      case "delete":
      const newData =state.data.filter((item)=>{
        return item !== action.payload
      })
      return {
        ...state, data:newData
      }


      case "edit":
        return {...state, inputData:action.payload.value,editingIndex:action.payload.index}

     default:
        return state
        

    }
  };

  const [state, dispatch] = useReducer(reducer, initialData);
  return (
    <>
      <div>Todo list </div>

      <div>
          <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "submit" });
          }}
        >
          <input
            type="text"
            value={state.inputData}
            onChange={(e) => {
              dispatch({ type: "add", payload: e.target.value });
            }}
          />
          <button>{state.editingIndex !==null ? "update" :"submit"}</button>
        </form>

        {state.data.map((item,index) => 
        <div key={item}>
          <li className="bg-amber-400">{item}</li>
          <span><button onClick={()=>dispatch({type:"delete",payload:item})}>delete</button></span>
          <span><button onClick={()=>dispatch({type:"edit",payload:{value:item,index:index}})}>Update</button></span>
        </div>
        )}
      </div>
    </>

  );
};