import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function Analysis3() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={8}>
                
                <Grid
                 container
                  spacing={2}
                   style={{ minWidth: '100vh' }}
                   >
                    <Grid item xs={6} textAlign='center'>
                        <Typography className="Analysis3">
                            Fig1
                        </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign='center'>
                        <Typography className="Analysis3">
                            Fig2
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid
                 container
                  spacing={2}
                   style={{ minWidth: '100vh' }}
                   >
                    <Grid item xs={6} textAlign='center'>
                        <Typography className="Analysis3">
                            Fig3
                        </Typography>
                    </Grid>
                    <Grid item xs={6} textAlign='center'>
                        <Typography className="Analysis3">
                            Fig4
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default Analysis3;