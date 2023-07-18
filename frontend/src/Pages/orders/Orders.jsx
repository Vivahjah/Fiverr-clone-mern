import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

import "./Orders.scss";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await axios.get(`/order`);
      return response.data;
    },
  });
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
     const res =  await axios.get(`/conversation/${id}`);
     navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await axios.post(`/conversation/`, {
          to: currentUser.seller ? sellerId : buyerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>

                <th>Contact</th>
              </tr>
            </thead>
            {data?.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>
                    <img className="image" src={order.img} alt="" />
                  </td>
                  <td>{order.title}</td>
                  <td>
                    {order.price}.<sup>99</sup>
                  </td>

                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
