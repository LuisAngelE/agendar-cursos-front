import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
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
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import Logo from "../layout/img/FOTON.png";
import CategoryIcon from "@mui/icons-material/Category";
import AuthContext from "../../context/Auth/AuthContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import AgendaContext from "../../context/Agenda/AgendaContext";
import CursosFavoritosContext from "../../context/CursosFavoritos/CursosFavoritosContext";

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

  const { cursos, GetCursosFavoritos } = React.useContext(
    CursosFavoritosContext
  );

  const { agendasCount, GetAgendasCount } = React.useContext(AgendaContext);
  const { cerrarSesion } = React.useContext(AuthContext);
  let type_user = localStorage.getItem("type_user");

  React.useEffect(() => {
    GetAgendasCount();
    GetCursosFavoritos();
  }, []);

  const Admin = [
    {
      name: "Inicio",
      value: "/Inicio",
      icon: <HomeIcon />,
    },
    {
      name: "Categorías",
      value: "/Categorias",
      icon: <CategoryIcon />,
    },
    {
      name: "Cursos",
      value: "/Cursos",
      icon: <MenuBookIcon />,
    },
    {
      name: "Cursos reservados",
      value: "/Agenda",
      icon: (
        <Badge badgeContent={agendasCount.length} color="error">
          <SchoolIcon />
        </Badge>
      ),
    },
    {
      name: "Calendario",
      value: "/Calendario",
      icon: <CalendarMonthIcon />,
    },
    {
      name: "Usuarios",
      value: "/Usuarios",
      icon: <GroupIcon />,
    },
    {
      name: "Mi perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  const Instructor = [
    {
      name: "Mis cursos",
      value: "/Cursos",
      icon: <MenuBookIcon />,
    },
    {
      name: "Mis cursos reservados",
      value: "/Agenda",
      icon: (
        <Badge badgeContent={agendasCount.length} color="error">
          <SchoolIcon />
        </Badge>
      ),
    },
    {
      name: "Mi calendario",
      value: "/Calendario",
      icon: <CalendarMonthIcon />,
    },
    {
      name: "Mi perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  const Alumnos = [
    {
      name: "Todos los cursos",
      value: "/Cursos",
      icon: <MenuBookIcon />,
    },
    {
      name: "Mis cursos favoritos",
      value: "/CursosFavoritos",
      icon: (
        <Badge badgeContent={cursos.length} color="error">
          <FavoriteIcon />
        </Badge>
      ),
    },
    {
      name: "Mis cursos reservados",
      value: "Agenda",
      icon: (
        <Badge badgeContent={agendasCount.length} color="error">
          <EventIcon />
        </Badge>
      ),
    },
    {
      name: "Mi calendario",
      value: "/Calendario",
      icon: <CalendarMonthIcon />,
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
          background: " #E8F5E9",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
              color: "black",
              transition: "0.2s",
              "&:hover": { rotate: "40deg" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              right: "100%",
              transform: "translateX(-100%)",
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{
                width: 80,
                height: 80,
              }}
            />
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip title="Cerrar sesión">
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

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "#E8F5E9" }}>
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
