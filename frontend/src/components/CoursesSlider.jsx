import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function ClassesSlider() {
  const navigate = useNavigate();

  const classesData = [
    {
      img: "/01.webp",
      title: "Abacus",
      desc: "Boost your child's math skills and concentration through fun abacus-based learning.",
      age: "5-12 years",
      weekly: "5 Days",
      time: "1 Hour"
    },
    {
      img: "/01.webp",
      title: "Kids English",
      desc: "Enhance your child's vocabulary, grammar, and communication skills with engaging activities.",
      age: "5-12 years",
      weekly: "5 Days",
      time: "1 Hour"
    },
    {
      img: "/01.webp",
      title: "Vedic Math",
      desc: "Master quick and easy calculation techniques with ancient Vedic math tricks.",
      age: "8-14 years",
      weekly: "5 Days",
      time: "1 Hour"
    },
    {
      img: "/01.webp",
      title: "Handwriting",
      desc: "Improve handwriting speed, style, and neatness through structured practice sessions.",
      age: "6-14 years",
      weekly: "5 Days",
      time: "1 Hour"
    }
  ];

  return (
    <>
      <style jsx>{`
        /* Your original CSS remains unchanged */
        .classes-section {
          background: #ff9248;
          padding: 4rem 0;
        }
        .section-header {
          color: white;
          margin-bottom: 3rem;
        }
        .section-subtitle {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          opacity: 0.9;
          font-family: 'Pacifico', cursive;
          color: #1f68ee;
                               
        }
        .section-title {
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .class-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          margin: 0 10px;
        }
        .class-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        .class-card-img {
          position: relative;
          height: 180px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }
        .class-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .class-card:hover .class-card-img img {
          transform: scale(1.05);
        }
        .class-card-content {
          padding: 1.5rem;
        }
        .class-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f68ee;
          margin-bottom: 0.8rem;
          cursor: pointer;
        }
        .class-description {
          color: #7f8c8d;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .class-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #ecf0f1;
          padding-top: 1rem;
        }
        .stat-item {
          text-align: center;
          flex: 1;
        }
        .stat-label {
          color: #ff9248;
          font-weight: 700;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.3rem;
          display: block;
        }
        .stat-value {
          color: #2c3e50;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .stat-divider {
          width: 1px;
          height: 30px;
          background: #ecf0f1;
          margin: 0 0.5rem;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: 700;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @media (max-width: 768px) {
          .section-title {
            font-size: 1.8rem;
          }
          .class-card {
            margin: 0 5px;
          }
          .class-card-content {
            padding: 1.2rem;
          }
        }
      `}</style>

      <section className="classes-section">
        <div className="container text-center">
          <div className="section-header">
            <p className="section-subtitle">Our Courses</p>
            <h2 className="section-title">
              We Meet Kids At Their Level <br /> 
              Regardless Of Their Age
            </h2>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 25 }
            }}
          >
            {classesData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="class-card">
                  <div className="class-card-img">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="class-card-content">
                    <h6
                      className="class-title"
                      onClick={() => navigate("/courses")}
                    >
                      {item.title}
                    </h6>
                    <p className="class-description">{item.desc}</p>
                    <div className="class-stats">
                      <div className="stat-item">
                        <span className="stat-label">Age</span>
                        <div className="stat-value">{item.age}</div>
                      </div>
                      <div className="stat-divider"></div>
                      <div className="stat-item">
                        <span className="stat-label">Weekly</span>
                        <div className="stat-value">{item.weekly}</div>
                      </div>
                      <div className="stat-divider"></div>
                      <div className="stat-item">
                        <span className="stat-label">Time</span>
                        <div className="stat-value">{item.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
