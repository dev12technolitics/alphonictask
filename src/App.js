import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { postLogoutUser } from "../src/redux/slices/loginRegister";
import AccordionOne from "./pages/components/accordionOne";
import Dashboard from "./pages/dashbord";
import Friends from "./pages/friends";
import CreateFriends from "./pages/friends/CreateFriends";
import LoginForm from "./pages/login/LoginForm";
import RegistrationForm from "./pages/login/RegistrationForm";

const drawerWidth = 200;

function App() {
  const dispatch = useDispatch();
  const { userAccessToken } = useSelector((state) => state.loginRegister);

  console.log("userAccessToken11111", userAccessToken);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <List>
          <ListItem disablePadding>
            <AccordionOne />
          </ListItem>
        </List>
      </List>
    </div>
  );

  return (
    <>
      <ToastContainer />
      {userAccessToken ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              zIndex: 9999,
            }}
          >
            <Toolbar>
              <div className="flex w-full justify-end px-12 py-2">
                {userAccessToken == null ? (
                  <div>profile</div>
                ) : (
                  <div className="flex">
                    <Link href="/">
                      <div
                        onClick={() => {
                          dispatch(postLogoutUser());
                        }}
                        className="text-base
                        flex items-center hover:cursor-pointer font-bold text-[#fff]"
                      >
                        Logout
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
            className="bg-[#fbfcfc]"
          >
            <Toolbar />
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/friends" element={<Friends />} />
                <Route
                  exact
                  path="/createfriends"
                  element={<CreateFriends />}
                />
              </Routes>
            </BrowserRouter>
          </Box>
        </Box>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route exact path="/friends" element={<RegistrationForm />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

App.propTypes = {
  window: PropTypes.func,
};

export default App;
