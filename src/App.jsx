import { useState } from "react";
import DeleteBack2FillIcon from 'remixicon-react/DeleteBack2FillIcon'
import AddLineIcon from 'remixicon-react/AddLineIcon'

function App() {
  const [groups, setGroups] = useState([
    {
      name: "group1",
      slots: ["g1_slot1", "g1_slot2", "g1_slot3"],
    },
    {
      name: "group2",
      slots: ["g2_slot1", "g2_slot2"],
    },
  ]);
  const [newGroup, setNewGroup] = useState("");

  const deleteGroup = (groupIndex) => {
    const newGroups = [...groups];
    newGroups.splice(groupIndex, 1);
    setGroups(newGroups);
  };

  const deleteSlot = (groupIndex, slotIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].slots.splice(slotIndex, 1);
    setGroups(newGroups);
  };

  const addGroup = () => {
    const newGroups = [...groups];
    newGroups.push({
      name: newGroup,
      slots: [],
    });
    setGroups(newGroups);
    setNewGroup("");
  };

  const addSlot = (groupIndex, slot) => {
    const newGroups = [...groups];
    newGroups[groupIndex].slots.push(slot);
    setGroups(newGroups);
  };

  const [items, setItems] = useState([]);

  const [inputValues, setInputValues] = useState({
    inputOne: "",
    inpuTwo: ""
  });
  //title
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(message);
  const handleTitle = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    setUpdated(message);
  };

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.id]: e.target.value
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let newItem = {
      a: inputValues.inputOne,
      b: inputValues.inpuTwo
    };

    setItems([...items, newItem]);
  };
  const handleDelete = (i) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  };
    //submitting the final form
    const [finalForm, setfinalForm] = useState([])
    const [finalAB, setfinalAB] = useState([])
    const finalSubmit = () => {
      setfinalForm([...groups])
      setfinalAB([...items])
      handleClick()
      console.table("groups: ",groups)
      console.table("items: ",items)
    }

  return (
    <div className="grid grid-cols-2">
    <div>
      <div className='bg-gray-200 ml-6 p-4 mt-6'>
        <div className="mb-4 ">
          <input
          className='py-2 px-2 w-full'
          type="text"
          // value={inputValues.inputOne}
          placeholder='Enter a title here'
          id="message"
          name="message"
          onChange={handleTitle}
          value={message}
          />
        </div>
        
      </div>
      {/* ab here */}
      <div className='bg-gray-200 ml-6'>
        <div className='bg-white'>
            <h1 className='py-2 text-xl px-8 font-bold'>A & B</h1>
        </div>
      <div className='py-2 px-4 m-4'>

        <form className=' gap-4' onSubmit={handleAdd}>
                <div>
                  {items.map((i, id) => {
                        return (
                          <div className='grid grid-cols-2 gap-6 items-center justify-center'>
                            <div className='grid grid-cols-2 gap-4 mb-4'>
                              <h3 className='bg-white px-4 py-2'>
                                {i.a}
                              </h3>
                              <h3 className='bg-white px-4 py-2'>
                                {i.b}
                              </h3>
                            </div>
                            <button className="" onClick={handleDelete}>
                              {
                                      <DeleteBack2FillIcon className=" translate-y-[-6px] text-red-600 "/>
                              }
                            </button>
                          </div>
                          
                        );
                      })}
                </div>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <input
                  className='py-2 px-2'
                  type="text"
                  // value={inputValues.inputOne}
                  placeholder='enter a here'
                  id="inputOne"
                  onChange={handleInputChange}
                  />
                  <input
                  className='py-2 px-2'
                  type="text"
                  id="inpuTwo"
                  placeholder='enter b here'
                  value={inputValues.inpuTwo}
                  onChange={handleInputChange}
                  />
                </div> 
                
                <button type="submit" className="flex items-center bg-indigo-500 text-white px-4 py-2 lg:rounded-r-lg rounded-lg justify-center">
                    <h1>AddSlot</h1>
                </button>
            </form>
        
      </div>
    </div>
      {/* styling the group component */}
      <div className="">
        {groups.map((group, i) => (
          <Group
            group={group}
            onDeleteGroup={() => deleteGroup(i)}
            deleteSlot={(slotIndex) => deleteSlot(i, slotIndex)}
            addSlot={(slot) => addSlot(i, slot)}
          />
        ))}

        <form
          className="mx-5 grid lg:grid-cols-5 grid-rows-2 items-center gap-4 mb-4 mr-10"
          onSubmit={(e) => {
            e.preventDefault();
            addGroup();
          }}
        >
          <input
            className="lg:col-span-3 border-2 border-gray-300 drop-shadow-lg rounded-l-lg px-4 py-2 w-full"
            type="text"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="Enter New Group name..."
          />
          <button type="submit" className="flex items-center bg-indigo-500 text-white px-4 py-2  rounded-r-lg justify-center">
                  <h1>{<AddLineIcon />}</h1>
                  <h1>AddGroup</h1>
                </button>
        </form>
      </div>
      <button type="submit" onClick={finalSubmit} className="w-full bg-indigo-600 px-4 py-2 m-4 lg:translate-y-[-4rem]">
        <h1 className="text-white font-bold text-2xl">Submit</h1>
      </button>
    </div>
    <div className="m-6 p-4 bg-gray-200">
      {<h1 className=" text-4xl bg-white px-2 py-2 my-4">Title: <span className="font-semibold">{updated}</span></h1>}
      <h1 className="font-bold text-2xl bg-white px-2 py-2 my-4">A & B: </h1>
      
      {
        finalAB.map((e,i) => {
          return (
            <div className="bg-white p-2">
              <div className="grid grid-cols-2 gap-4">
                <p key={i} className="bg-gray-200 px-4 py-2">{e.a}</p>
                <p key={i} className="bg-gray-200 px-4 py-2">{e.b}</p>
              </div>
              
            </div>
            
          )
        })
      }
      <h1 className="font-bold text-2xl bg-white px-2 py-2 my-4">Groups: </h1>
      {finalForm.map(e => {
        return (
          <div className="bg-white my-4 p-4 ">
            <p key={e.name} className="font-bold text-2xl bg-gray-200 px-2 py-2 my-4">{e.name}</p>
            <div>
              {
                e.slots.map(c => {
                  return(
                      <div key={c} className="">
                        <h1 className="bg-gray-200 mb-4 px-4 py-2">{c}</h1>
                      </div>
                  )
                })
              }
            </div>
          </div>
          
        )
      })}

    </div>
    </div>
    
    
  );
}

const Group = ({ group, onDeleteGroup, deleteSlot, addSlot }) => {
  const [newSlot, setNewSlot] = useState("");

  const onAddSlot = () => {
    addSlot(newSlot);
    setNewSlot("");
  };

  return (
    <div className=" m-5 p-2 bg-gray-200 rounded-lg">
      <div className="border-2">
        {/* main groups container */}
        <div className="flex flex-col mt-2">
          {/* the groups tab */}
          <div className="mb-2">
            <div className="grid grid-cols-4 gap-4 w-full ">
            <h1 className="bg-white pl-4 col-span-3 py-2">{group.name}</h1>
              <button className="" onClick={onDeleteGroup}>
                {
                        <DeleteBack2FillIcon className=" ml-4 text-red-600"/>
                }
              </button>
              
            </div>
            
          </div>
          {/* this is the slots part */}
          <div className="bg-white py-2 px-4">
            <div className="font-bold">Captions</div>
            {group.slots.map((slot, i) => (
              <div className="grid grid-cols-4 items-center gap-4 py-4">
                {/* the slots one components */}
                <div className="col-span-3 border-2 rounded-lg px-4 py-2">
                    <span className="px-4">{slot}</span> 
                </div>
                <button className="text-4xl text-red-600" onClick={() => deleteSlot(i)}>
                        {
                          <DeleteBack2FillIcon />
                        }
                </button>
              </div>
              
            ))}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddSlot();
              }}
              className="grid lg:grid-cols-5 grid-rows-2 items-center gap-4 mb-4 mr-10"
            >
              <input
                className="lg:col-span-3 border-2 rounded-lg px-4 py-2 w-full"
                type="text"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                placeholder="Enter New Slots..."
              />
              {/* style the button here */}
              <button type="submit" className="flex items-center bg-indigo-500 text-white px-4 py-2 lg:rounded-r-lg rounded-lg justify-center">
                <h1>{<AddLineIcon />}</h1>
                <h1>AddSlot</h1>
              </button>
            </form>
          </div>
        </div>
        </div>
    </div>
  );
};


export default App;