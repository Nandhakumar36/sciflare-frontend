
import React, { useState } from 'react'
// import Navbar from './Navbar';
// import { Nav } from './Navbar/NavbarElements';
import { Grid, Paper, Box } from '@mui/material'
import { styled } from '@mui/material/styles';

// import Navbar from '../components/dashboard/navbar/Navbar';
// import Sidebar from '../components/dashboard/sidebar/Sidebar';


// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const openSidebar = () => {
    setSidebarOpen(true)
  }
  const closeSidebar = () => {
    setSidebarOpen(false)
  }
  return (
    <React.Fragment>
      <Box >
        <Grid container spacing={0}>
          <Grid  xs={2}>
            {/* <Item> */}
            {/* <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} /> */}

            {/* </Item> */}
          </Grid>
          <Grid  xs={10}>
            <div>{children}</div>

          </Grid>
        </Grid>
      </Box>
      {/* <div className="navigationWrapper"> */}
      {/* <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} /> */}
      {/* <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} /> */}
      {/* </div> */}
    </React.Fragment>
  );
};
export default Layout;