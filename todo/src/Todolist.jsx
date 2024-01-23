import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Todolist = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const AddClick = () => {
    if (inputdata == false) {
      setInputdata("");
    } else if (inputdata && !toggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: inputdata };
          }
          return elem;
        })
      );
      setToggle(true);
      setInputdata("");
      setIsEdit(null);
    } else {
      const allData = { id: new Date().getTime().toString(), name: inputdata };
      setItems([...items, allData]);
      setInputdata("");
    }
  };

  const deleteClick = (id) => {
    const updatedItems = items.filter((elem) => {
      return id !== elem.id;
    });

    setItems(updatedItems);
  };

  const editClick = (id) => {
    const editItems = items.find((elem) => {
      return elem.id === id;
    });
    console.log(editItems);
    setToggle(false);
    setInputdata(editItems.name);
    setIsEdit(id);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <div className="text-center">
        <img src="./images/note.jpg" alt="" className="w-20 mx-auto" />
        <h1 className="text-2xl font-bold mt-5">Add Your List Here</h1>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Add Items..."
            value={inputdata}
            onChange={(e) => setInputdata(e.target.value)}
            className="border rounded p-2 mt-4 w-72"
          />
          {toggle ? (
            <div className="ml-[-35px] cursor-pointer mt-4">
              <AddIcon onClick={AddClick} />
            </div>
          ) : (
            <div className="ml-[-38px] cursor-pointer mt-4">
              <EditIcon onClick={AddClick} />
            </div>
          )}
          {/* <div className="ml-[-35px] cursor-pointer mt-5">
          
            <AddIcon onClick={AddClick} />
          </div> */}
        </div>
      </div>
      <div>
        {items.map((elem) => {
          return (
            <div key={elem.id}>
              <div className="border-2 border-solid border-lime-300 text-center rounded flex justify-center w-72 mt-5 ml-2">
                <h1 className="flex-1 p-2">{elem.name}</h1>
                <EditIcon
                  onClick={() => editClick(elem.id)}
                  className="mt-2 mr-4"
                />
                <DeleteIcon
                  className="cursor-pointer mt-2 mr-2"
                  onClick={() => deleteClick(elem.id)}
                />
              </div>
            </div>
          );
        })}
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

export default Todolist;
