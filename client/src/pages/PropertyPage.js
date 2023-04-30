import CustomScrollbar from "../components/CustomScrollbar";
import { useState } from "react";

export default function Property() {
    const [marketValueRange, setMarketValueRange] = useState([]);
    const handleRangeChange = (value) => {
        setMarketValueRange(value);
    };

    return(
    <div>
        Our Property Page
        <CustomScrollbar
            title="Market Value filter"
            upperLimit={2000000}
            lowerLimit={0}
            initialValue={[100000, 500000]}
            isRange
            onChange={handleRangeChange}
        />
    </div>);
}