import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, AppBar as MuiAppBar, Toolbar } from "@mui/material";
import Logo from "../../components/layout/img/logoNegro.png";
import { useState } from "react";
import { useContext } from "react";
import RecipeReviewCard from "./RecipeReviewCard";
import { useEffect } from "react";
import CursosPublicosContext from "../../context/CursosPublicos/CursosPublicosContext";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CursosPublicos = () => {
  const { cursosPublicos, GetCursosPublicos } = useContext(CursosPublicosContext);
  const [open] = useState(false);

  useEffect(() => {
    GetCursosPublicos();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          open={open}
          sx={{
            background:
              "#E8F5E9",
          }}
        >
          <Toolbar sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src={Logo}
                alt="logo"
                style={{
                  width: 80,
                  height: 60,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Grid container spacing={2} sx={{ padding: 2, marginTop: 8, }}>
        {cursosPublicos.length > 0
          ? cursosPublicos.map((curso) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <RecipeReviewCard curso={curso} />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

export default CursosPublicos;
