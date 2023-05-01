import Heatmap from "../components/Heatmap";
import { Grid, Typography, Paper } from '@mui/material';
import RadarChart from "../components/CrimeRadar";
import CrimeLineChart from "../components/CrimeLineChart";

export default function HomePage() {
   
    return (       
        <Grid container justify="center" alignItems="center" spacing={2}>
            
            <Grid item xs={12}>
                <Paper elevation={3} style={{padding: "1em", margin: "1em"}} display="flex" justifyContent="center">
                    <Typography variant="h5">Crime Heatmap</Typography>
                    <Typography variant="body2">Map showcasing the crime hotspots of Philadelphia.</Typography>
                    <Heatmap height="50vh" width="95vw" />
                </Paper>
            </Grid>

            <Grid item xs={6} >
                <Paper elevation={3} style={{padding: "1em",  margin: "1em"}} display="flex" justifyContent="center" margin={2}>
                    <Typography variant="h5">Violent Crime Radar Chart</Typography>

                    <RadarChart violence={true} />
                </Paper>
            </Grid>

            <Grid item xs={6} >
                <Paper elevation={3} style={{padding: "1em",  margin: "1em"}} display="flex" justifyContent="center" margin={2}>
                    <Typography variant="h5">Non-Violent Crime Radar Chart</Typography>

                    <RadarChart violence={false}/>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={3} style={{padding: "1em", margin: "1em"}} display="flex">
                    <Typography variant="h5">Crime Data Linechart</Typography>
                    <CrimeLineChart/>
                </Paper>
            </Grid>
        </Grid>
    );
}