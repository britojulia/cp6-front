import DashboardCard from "../Dashboard/Dashboard";
import { MdClass } from "react-icons/md";

export default function Menu() {
    return (
        <div>
            <div>
                <DashboardCard
                title={"Checkpoints realizados"} 
                count={0} 
                icon={<MdClass />}/>
                <DashboardCard
                title={"Global Solutions"} 
                count={0} 
                icon={<MdClass />}/>
                <DashboardCard
                title={"Challenge"} 
                count={0} 
                icon={<MdClass />}/>
            </div>
        </div>
    )
}