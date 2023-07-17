import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Message = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));


  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get(`/message/${id}`);
      return response.data;
    },
  });
  const mutation = useMutation({
    mutationFn: (message) => {
      return axios.post(`/message`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; John Doe &gt;
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default Message;