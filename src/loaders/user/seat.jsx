import { useParams } from "react-router-dom";
import showInstance from "../../axioInstances/user/showInstance";

const seatLoader = async({params})=>{
    try {
        console.log(params)
        const {showid} = params
        console.log(showid)
       
        const response = await showInstance.get(`/${showid}`);
        console.log(response?.data)
        return (response?.data?.show);
       
      } catch (err) {
        console.log(err.message);
        return [];
      }
}
export default seatLoader