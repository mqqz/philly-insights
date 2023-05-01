
import Heatmap from "../components/Heatmap";
import BlocksTable from "../components/BlocksTable";
import CrimeToBlockTable from "../components/CrimeToBlockTable";

export default function Blocks() {
    return (
        <div style={{ padding: "3em", margin: "2em" }}>
            <BlocksTable />
            <CrimeToBlockTable />
        </div>
    );
}