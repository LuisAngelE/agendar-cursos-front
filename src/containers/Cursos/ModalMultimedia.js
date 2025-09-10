import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Box, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AuthContext from "../../context/Auth/AuthContext";
import Default from "../../components/layout/img/default.png";
import CursosContext from "../../context/Cursos/CursosContext";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  logoimagen: {
    height: "400px",
    width: "400px",
    objectFit: "cover",
  },
});

export default function ModalMultimedia({ open, handleClose, id }) {
  const classes = useStyles();
  const [image, saveImage] = useState({
    urlPhoto: Default,
    image: "",
  });
  const [debouncedFile] = useDebounce(image.image, 500);
  const handleChangeImage = (e) => {
    saveImage({
      ...image,
      urlPhoto: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    });
  };

  const { ChangePhotoCourse } = useContext(CursosContext);

  useEffect(() => {
    ExistImage();
  }, [debouncedFile]);
  const ExistImage = () => {
    if (image.image !== "") {
      handleClose();
      var data = {};
      data.id = id;
      data.image = image.image;
      ChangePhotoCourse(data);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <img
                  src={image.urlPhoto}
                  className={classes.logoimagen}
                  alt="agrega evidencia"
                />
              </div>
            </Box>
            <input
              className={classes.input}
              id="icon-button-file-first"
              type="file"
              name="image"
              accept="image/png, image/jpg, image/jpeg, image/webp"
              onChange={handleChangeImage}
            />
            <InputLabel sx={{ textAlign: "center" }}>
              Selecciona tu Imagen
              <label htmlFor="icon-button-file-first">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Tooltip
                    title="seleccionar imagen"
                    aria-label="seleccionar imagen"
                    placement="top"
                  >
                    <PhotoCameraIcon />
                  </Tooltip>
                </IconButton>
              </label>
            </InputLabel>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
