const reducer = (state, action) => {
  switch (action.type) {
    case "Add_task":
      return [
        ...state,
        {
          id: new Date().getTime().toString(),
          name: action.payload
        }
      ];

    case "Delete_task":
      return state.filter((item, index) => index !== action.payload);

    case "Edit_task":
      return state.map((item, index) =>
        index === action.payload.index
          ? { ...item, name: action.payload.input }
          : item
      );

    case "Clear_task":
      return [];

    default:
      return state;
  }
};
export default reducer;