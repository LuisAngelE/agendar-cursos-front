import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import Logo from "../layout/img/logoNegro.png";
import AuthContext from "../../context/Auth/AuthContext";
import Noresultados from "./gif/404.gif";

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

const NoResultados = () => {
  const { cerrarSesion } = React.useContext(AuthContext);
  const [open] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: "#E8F5E9",
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

          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip title="Cerrar Sesión">
              <IconButton onClick={() => cerrarSesion()}>
                <ExitToAppIcon
                  sx={{
                    color: "black",
                    fontSize: 25,
                    transition: "0.2s",
                    "&:hover": { scale: "2" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          textAlign: "center",
          p: 2,
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />

        <Grid item>
          <Box
            component="img"
            src={Noresultados}
            alt="No se encontraron resultados"
            sx={{
              maxWidth: "400px",
              width: "100%",
              borderRadius: 2,
              mb: 3,
            }}
          />
        </Grid>
        <Grid item sx={{ width: "100%", maxWidth: 300 }}>
          <Link to="/Perfil" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#E8F5E9",
                color: "black",
                fontWeight: "bold",
                borderRadius: 2,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#E8F5E9",
                },
              }}
            >
              Regresar
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoResultados;
