const baseURL = 'http://localhost:1717/pastry'

//get all sweets
const getSweets = async () => {
    let response = await fetch(baseURL)
    return await response.json()
};
//post sweet
const postSweet = async () => {};
//update sweet
const updateSweet = async (sweet) => {};
//delete sweet
const deleteSweet = async (id) => {}; 

export{getSweets}