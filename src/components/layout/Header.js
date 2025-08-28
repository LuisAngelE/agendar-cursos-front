import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Header({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const { cerrarSesion } = React.useContext(AuthContext);
  let type_user = localStorage.getItem("type_user");

  const Admin = [
    {
      name: "Inicio",
      value: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Usuarios",
      value: "/Usuarios",
      icon: <SupervisorAccountIcon />,
    },
    {
      name: "Instructores",
      value: "/Instructores",
      icon: <SchoolIcon />,
    },
    {
      name: "Cursos",
      value: "/Cursos",
      icon: <ClassIcon />,
    },
    {
      name: "Agenda",
      value: "/Agenda",
      icon: <EventIcon />,
    },
    {
      name: "Perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  const Instructor = [
    {
      name: "Inicio",
      value: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Mis Cursos",
      value: "/Cursos",
      icon: <ClassIcon />,
    },
    {
      name: "Agenda",
      value: "/Agenda",
      icon: <EventIcon />,
    },
    {
      name: "Alumnos",
      value: "/Usuarios",
      icon: <GroupIcon />,
    },
    {
      name: "Perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  const Alumnos = [
    {
      name: "Inicio",
      value: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Cursos",
      value: "/Cursos",
      icon: <ClassIcon />,
    },
    {
      name: "Mis Agendas",
      value: "Agenda",
      icon: <EventIcon />,
    },
    {
      name: "Perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  let menuItems = [];
  if (type_user === "1") menuItems = Admin;
  if (type_user === "2") menuItems = Instructor;
  if (type_user === "3") menuItems = Alumnos;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        sx={{
          background:
            "radial-gradient(circle,rgba(255, 255, 255, 1) 0%, rgba(63, 94, 251, 1) 100%);",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            fontFamily="monospace"
            fontWeight="bold"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", color: "black" }}
          >
            Agenda tu Curso
          </Typography>

          <Tooltip title="Cerrar Sesión">
            <IconButton onClick={() => cerrarSesion()}>
              <ExitToAppIcon
                sx={{ color: "white", fontSize: 25 }}
              ></ExitToAppIcon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "#3F5EFB" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "black" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "black" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.name} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.value}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "black",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
