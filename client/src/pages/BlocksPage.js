
import Heatmap from "../components/Heatmap";
import BlocksTable from "../components/BlocksTable";
import CrimeToBlockTable from "../components/CrimeToBlockTable";
import DispatchTimeTable from "../components/DispatchTimeTable";

export default function Blocks() {
    return (
        <div style={{ padding: "3em", margin: "2em" }}>
            <BlocksTable />
            <CrimeToBlockTable />
            <h1 style={{fontSize: "20px"}}>Response Time Depending on Crime Type and Block</h1>
            <DispatchTimeTable />
        </div>
    );
}