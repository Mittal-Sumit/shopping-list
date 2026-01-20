"use client";
import { useEffect, useState } from "react";
import "./shopping.css";

const ShoppingList = () => {
  const [food, setFood] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handleInput = (e) => {
    setFood(e.target.value);
  };

  const handleShoppingList = (e) => {
    const idx = e.target.getAttribute("data-id");
    if (idx) {
      const obj = {
        id: crypto.randomUUID(),
        data: shoppingList[idx],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood("");
  };
  console.log("bucketList is --", bucketList);

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  };

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id != id);
    setBucketList(newList);
  };

  const fetchItems = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;
    const result = await fetch(url);
    const data = await result.json();
    setShoppingList(data);
  };

  useEffect(() => {
    if (food.length >= 2) {
      //make api call
      fetchItems(food);
    }
  }, [food]);

  return (
    <div className=" text-center items-center">
      <h1 className=" text-6xl font-bold">My Shopping List</h1>
      <div>
        <input
          className=" w-57.5 h-[40px] outline-none text-2xl font-bold p-3 mt-8 border-2"
          value={food}
          onChange={handleInput}
        />
      </div>
      {food.length >= 2 ? (
        <div
          className=" w-[230px] m-2.5 h-[150px] bg-gray-400 overflow-y-auto"
          onClick={handleShoppingList}
        >
          {shoppingList.map((item, index) => {
            return (
              <div
                key={item}
                className=" m-3 text-2xl p-1.5 cursor-pointer"
                data-id={index}
              >
                {item}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className=" w-[300px] m-[50px]">
        {bucketList.map((item) => {
          return (
            <div
              key={item.id}
              className=" flex justify-between items-center h-[30px] bg-[lightseagreen] text-white text-[20px] font-bold p-2.5 mt-[10px]"
            >
              <button
                onClick={() => handleRightClick(item.id)}
                className="cursor-pointer"
              >
                ✓
              </button>
              <div className={item.isDone ? "strike" : ""}>{item.data}</div>
              <button
                onClick={() => handleDelete(item.id)}
                className="cursor-pointer"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingList;
