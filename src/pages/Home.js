import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Axios from "axios";
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import BackgroundHeader from "../map.jpeg"
import { DataGrid } from '@mui/x-data-grid';

const BackgroundHead = {
  backgroundImage: 'url(' + BackgroundHeader + ')',
  height: 400,
  width: '110%',
}


const StyledPaper = styled(Paper)(
  `
  background: linear-gradient(to top left, #000032, #000032);  
  color: 000000;
  fontSize: 6;
  `
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000032",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#4dddae",
  },

  '&:nth-of-type(even)': {
    backgroundColor: "#5be587",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


function Home() {
  const [status, setStatus] = useState('');
  const [pods, setPods] = useState([{'name': [], 'status':[]}]);

  const fetch = async () => {

    const res0 = await Axios.get("http://112.10.110.110:5001/fetch");
    var { data } = await res0;
    setStatus(data);

    const res1 = await Axios.get("http://112.10.110.110:5001/pods");
    var { data } = await res1;
    setPods(data);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledPaper elevation={0} aria-label="side bar">
      <div>
        <Box sx={{ pt: 0, pb: 5.00, borderRadius: '30px', borderColor: 'yellow' }} fontFamily="Shabnam" fontSize="12" >
          <Grid container spacing={1} sx={{ mt: 2, width: '100%' }} align="center">
            <Grid item xs={0.5} />
            <Grid item xs={1} align="left">
              <Card variant="outlined" border='3px dashed grey' style={{ background: 'linear-gradient(to right, #7442e9, #a63bf3)', height: '11vh' }} align="center">
                <React.Fragment>
                  <CardContent border='3px dashed grey'>
                    <Typography align="left" variant="h5" component="div">
                      {status}
                    </Typography>
                  </CardContent>
                </React.Fragment>
              </Card>
            </Grid>
            <Grid item xs={10} align="left">
              <Card variant="outlined" border='3px dashed grey' 
              style={{ background: 'linear-gradient(to right, #5be587, #4dddae)' }} align="center">
                <React.Fragment>
                  <CardContent border='3px dashed grey'>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Pods</StyledTableCell>
                            <StyledTableCell align="right">status</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pods.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.status}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </React.Fragment>
              </Card>
            </Grid>

            <Grid item xs={0.5} />
          </Grid>
        </Box>
      </div>
    </StyledPaper>
  );
}

export default Home;
