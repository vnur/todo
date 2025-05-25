import { useReducer } from "react";

export const Todo = () => {
  const initialData = {
    inputData: "",
    data: [],
    Indexno: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return { ...state, inputData: action.payload };

      case "submit":
        if (state.Indexno !== null) {
          const updateData = state.data;
          updateData[state.Indexno] = state.inputData;
          return { ...state, data: updateData, inputData:"" };
        }
        return {
          ...state,
          data: [...state.data, state.inputData],
          inputData: "",
        };

      case "delete":
        const newData = state.data.filter((item) => item !== action.payload);
        return { ...state, data: newData };

      case "edit":
        const data = state.data.indexOf(action.payload);
        return { ...state, inputData: action.payload, Indexno: data };

      default:
        return state;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "submit" });
  };

  const [state, dispatch] = useReducer(reducer, initialData);
  return (
    <>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 "
            value={state.inputData}
            onChange={(e) => dispatch({ type: "add", payload: e.target.value })}
          />
          <button className="bg-amber-300 ">
            {state.Indexno === null ? "submit" : "update"}
          </button>
        </form>

        <ul>
          {state.data.map((item, index) => {
            return (
              <li key={index}>
                {item}
                <button
                  className="bg-red-300"
                  onClick={(e) => dispatch({ type: "delete", payload: item })}
                >
                  delete
                </button>
                <button
                  className="bg-blue-300"
                  onClick={(e) => dispatch({ type: "edit", payload: item })}
                >
                  edit
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
