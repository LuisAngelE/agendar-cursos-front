import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";

const MultimediaCursos = ({ images = [] }) => {
  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#1C277D",
          "--swiper-pagination-color": "#1C277D",
          borderRadius: "20px",
          border: "2px solid #1C277D",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        }}
        zoom={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1 }, // móviles
          640: { slidesPerView: 1 }, // tablets vertical
          768: { slidesPerView: 1 }, // tablets horizontal
          1024: { slidesPerView: 1 }, // desktop normal
        }}
      >
        {images.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="swiper-zoom-container">
                <img
                  src={img.url}
                  alt={img.title ? img.title : `Imagen del curso ${img.id}`}
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
              color: "#666",
              fontStyle: "italic",
              background: "#f5f5f5",
              borderRadius: "20px",
            }}
          >
            No hay imágenes disponibles
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default MultimediaCursos;
