import React, { useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import Reviews from "../../components/reviews/Reviews";
import { toast } from "react-toastify";

function Gig() {
  const [payResult, setPayResut] = useState("");
  // const { email } = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: async () => {
      const response = await axios.get(`/gig/${id}`);
      return response.data;
    },
  });
  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`/user/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
  console.log(dataUser, "dataUser");

  const handlePayment = async () => {
    const { email } = JSON.parse(localStorage.getItem("user"));
    if(!email){
     return toast.success("you are not logged in !!");

    }
    try {
      const res = await axios.post(`order/acceptpayment/${id}`, { email });
      const data = JSON.parse(res.data);
      setPayResut(data);
      console.log(payResult);

      window.open(data.data.authorization_url, "_blank");
      // window.location.href = data.data.authorization_url;
      console.log(data.data.authorization_url);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr &gt; Graphics &amp; Design &gt;
            </span>
            <h1>{data?.title}</h1>
            {isLoadingUser ? (
              "loading..."
            ) : errorUser ? (
              "something went wrong"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.image || "./img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {Math.round(data.totalStars / data.stars) !== 0 && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.stars))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}

                    <span>{Math.round(data.totalStars / data.stars)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="cover_img" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              {isLoadingUser ? (
                "loading..."
              ) : errorUser ? (
                "something went wrong"
              ) : (
                <div className="user">
                  <img src={dataUser.image || "./img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {Math.round(data.totalStars / data.stars) !== 0 && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.stars))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}

                        <span>{Math.round(data.totalStars / data.stars)}</span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
              )}
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{dataUser?.desc}</p>
              </div>
            </div>
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}.99</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((item) => (
                <div className="item" key={item}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={handlePayment}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
