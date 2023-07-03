import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";

import "./Orders.scss";

const Orders = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await axios.get(`/order`);
      return response.data;
    },
  });
  console.log(data, "orders");
  const currentUser = JSON.parse(localStorage.getItem("user"));

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
            {data.map((order) => (
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
                    <img className="message" src="./img/message.png" alt="" />
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
