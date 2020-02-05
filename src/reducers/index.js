import moment from "moment";

export const INITIAL_STATE = {
  toDoList: [
    {
      id: 1,
      title: "Buy groceries",
      completed: false,
      due: moment().subtract(1, "days")
    },
    {
      id: 2,
      title: "Pay bills",
      completed: false,
      due: moment().add(1, "days")
    },
    {
      id: 3,
      title: "Go to movies",
      completed: false,
      due: moment().add(2, "weeks")
    }
  ],
  total: 3
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        toDoList: [...state.toDoList, action.payload],
        total: state.total + 1
      };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        toDoList: state.toDoList.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        toDoList: state.toDoList.filter(todo => todo.completed === false),
        total: state.toDoList.filter(todo => todo.completed === false).length
      };
    default:
      return state;
  }
};
