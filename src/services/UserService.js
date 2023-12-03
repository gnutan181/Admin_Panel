import axios from "axios";
import { API_URL } from "../constants";
 const newUsers = (users)=> {
    return users.map(user => {
        user.selected = false;
        user.edit = false;
        user.show = true;
        return user;
    })
} 

const getUsers = async(setUsers) => {
    try {
        const {data} = await axios.get(API_URL)
        setUsers(newUsers(data));
    } catch (error) {
        console.log(error)
    }
}
export { getUsers };
