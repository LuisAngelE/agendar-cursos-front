import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Box, Grid, Typography, Chip, Paper } from "@mui/material";
import MethodGet from "../../config/service";
import Default from "../../components/layout/img/default.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function VistaCursos(props) {
  const { id } = props.match.params;
  const [curso, saveCurso] = useState({});
  console.log(curso);

  useEffect(() => {
    let url = `/course/${id}`;
    MethodGet(url)
      .then((res) => {
        saveCurso(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Layout>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
              style={{ height: 400 }}
            >
              {curso?.images && curso.images.length > 0 ? (
                curso.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.url}
                      alt={`curso-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src={Default}
                    alt="default"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {curso.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {curso.modality && <Chip label={curso.modality} color="primary" />}
            {curso.duration && (
              <Chip label={curso.duration} color="secondary" />
            )}
            {curso?.category?.name && <Chip label={curso.category.name} />}
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {curso.description}
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
