import Heatmap from "../components/Heatmap";
import Grid from "@mui/material/Grid"
import RadarChart from "../components/CrimeRadar";

export default function HomePage() {
    return (       
        <Grid container justify="center" alignItems="center">
            <Grid item style={{ margin: "auto" }}>
                <Heatmap height="50vh" width="75vw" />
            </Grid>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                    <RadarChart />
                </Grid>
                <Grid item xs={6}>
                    <RadarChart />
                </Grid>
            </Grid>
        </Grid>
    );
}