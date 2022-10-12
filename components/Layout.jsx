import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchComponent from "./SearchComponent";
import PropTypes from "prop-types";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Github Topic Explorer</title>
        <meta name="description" content="Search tool for Github topics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Github Topic Explorer
          </Typography>
          <SearchComponent />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
