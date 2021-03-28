const baseURL = "http://localhost:1717/pastry/";

//get all sweets
const getSweets = async () => {
  let response = await fetch(baseURL);
  return await response.json();
};
//post sweet
const postSweet = async (newItem) => {};
//update sweet
const updateSweet = async (id, sweet) => {
  let config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset = utf-8",
    },
    body: JSON.stringify(sweet),
  };
  let response = fetch(baseURL + "update/" + id, config);
};
//delete sweet
const deleteSweet = async (id) => {
  let config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset = utf-8",
    },
  };
  let response = fetch(baseURL + "delete/" + id, config);
};

export { getSweets, updateSweet, deleteSweet };
