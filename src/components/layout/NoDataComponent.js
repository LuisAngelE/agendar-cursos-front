import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "300px", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#ffffffff",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0px 4px 10px rgba(30, 32, 148, 0.1)",
  },
  icon: {
    fontSize: "60px",
    color: "#000000ff",
    marginBottom: "20px",
  },
  text: {
    color: "#000000ff",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtext: {
    color: "#555",
    fontSize: "16px",
    textAlign: "center",
    marginTop: "8px",
  },
}));

export default function NoDataComponent() {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Box className={classes.container}>
        <InfoOutlinedIcon className={classes.icon} />
        <Typography className={classes.text}>
          No hay Cursos Favoritos disponibles
        </Typography>
      </Box>
    </Grid>
  );
}
