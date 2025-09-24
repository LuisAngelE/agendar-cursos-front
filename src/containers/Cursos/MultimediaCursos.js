import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";

const MultimediaCursos = ({ images = [] }) => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#1C277D",
          "--swiper-pagination-color": "#D46227",
        }}
        zoom={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
      >
        {images.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="swiper-zoom-container">
                <img
                  src={img.url}
                  alt={`curso-${img.id}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p style={{ color: "black", textAlign: "center" }}>
            No hay imágenes disponibles
          </p>
        )}
      </Swiper>
    </>
  );
};

export default MultimediaCursos;
