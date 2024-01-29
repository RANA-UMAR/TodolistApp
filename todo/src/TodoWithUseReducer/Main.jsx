import React, { useReducer, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import reducer from './reducer';


const initialState = [];

const init= (initialState)=>{
const result = [...initialState,{id:1,name:"shopping"}]
return result;
}

const To_Do_Actions ={
  ADD_TASK : "Add_task",
  EDIT_TASK : "Edit_task",
  DELETE_TASK : "Delete_task",
  CLEAR_TASK : "Clear_task"
}

const Main = () => {
  const [todo, dispatch] = useReducer(reducer, initialState,init);
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input === '') {
      setInput('');
    } else {
      if (isEdit) {
        dispatch({ type: To_Do_Actions.EDIT_TASK, payload: { index: editIndex, input } });
        setIsEdit(false);
        setEditIndex(null);
      } else {
        dispatch({ type: To_Do_Actions.ADD_TASK, payload: input });
      }
      setInput('');
    }
  };

  const deleteClick = (index) => {
    dispatch({ type: To_Do_Actions.DELETE_TASK, payload: index });
  };

  const editClick = (index) => {
    setInput(todo[index].name);
    setIsEdit(true);
    setEditIndex(index);
  };

  const removeAll = () => {
    dispatch({ type: To_Do_Actions.CLEAR_TASK });
  };

  return (
    <div className='todolist-container mt-10 flex flex-col items-center'>
      <div className='text-center'>
        <img src="./images/note.jpg" alt="" className='w-20 mx-auto'/>
        <h1 className='mt-5'>Add Your List Here {todo.length}</h1>
        <div className='input-container flex items-center mt-5'>
          <input
            type="text"
            placeholder='Add Items...'
            className='p-2 w-72 border-b-2 focus:outline-none'
            value={input}
            onChange={handleInput}
          />
          <div className="ml-[-35px] cursor-pointer">
            {isEdit ? (
              <AddIcon onClick={handleAdd} className="mt-2 mr-4" />
            ) : (
              <AddIcon onClick={handleAdd} />
            )}
          </div>
        </div>
        <div>
          {todo.map((item, index) => (
            <div key={index}>
              <div className="border-2 border-solid border-lime-300 text-center rounded flex justify-center w-72 mt-5 ml">
                <h1 className="flex-1 p-2">{item.name}</h1>
                {isEdit && editIndex === index ? (
                  <AddIcon onClick={handleAdd} className="mt-2 mr-4" />
                ) : (
                  <EditIcon onClick={() => editClick(index)} className="mt-2 mr-4" />
                )}
                <DeleteIcon
                  className="cursor-pointer mt-2 mr-2"
                  onClick={() => deleteClick(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className="px-3 py-2 bg-slate-700 text-white mt-5 rounded "
          onClick={removeAll}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Main;
