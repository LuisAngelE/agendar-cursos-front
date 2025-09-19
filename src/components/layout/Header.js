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
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessIcon from "@mui/icons-material/Business";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import Logo from "../layout/img/logo.png";
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
  
  const { agendas, GetAgendas } = React.useContext(AgendaContext);
  const { cerrarSesion } = React.useContext(AuthContext);
  let type_user = localStorage.getItem("type_user");

  React.useEffect(() => {
    GetAgendas();
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
      name: "Cursos Agendados",
      value: "/Agenda",
      icon: (
        <Badge badgeContent={agendas.length} color="error">
          <SchoolIcon />
        </Badge>
      ),
    },
    {
      name: "Personas Físicas",
      value: "/PersonasFisicas",
      icon: <GroupIcon />,
    },
    {
      name: "Personas Morales",
      value: "/PersonasMorales",
      icon: <BusinessIcon />,
    },
    {
      name: "Mi Perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  const Instructor = [
    {
      name: "Mis Cursos",
      value: "/Cursos",
      icon: <MenuBookIcon />,
    },
    {
      name: "Mis Cursos Agendados",
      value: "/Agenda",
      icon: (
        <Badge badgeContent={agendas.length} color="error">
          <SchoolIcon />
        </Badge>
      ),
    },
    {
      name: "Mi Perfil",
      value: "/Perfil",
      icon: <PersonIcon />,
    },
  ];

  const Alumnos = [
    {
      name: "Todos los Cursos",
      value: "/Cursos",
      icon: <MenuBookIcon />,
    },
    {
      name: "Mis Cursos Favoritos",
      value: "/CursosFavoritos",
      icon: (
        <Badge badgeContent={cursos.length} color="error">
          <FavoriteIcon />
        </Badge>
      ),
    },
    {
      name: "Mis Cusos Agendados",
      value: "Agenda",
      icon: (
        <Badge badgeContent={agendas.length} color="error">
          <EventIcon />
        </Badge>
      ),
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
            "linear-gradient(90deg,rgba(28, 39, 125, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(240, 94, 41, 1) 100%);",
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
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>

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
              }}
            />
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip title="Cerrar Sesión">
              <IconButton onClick={() => cerrarSesion()}>
                <ExitToAppIcon sx={{ color: "white", fontSize: 25 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "#1C277D" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
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
