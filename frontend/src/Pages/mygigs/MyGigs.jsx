import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import axios from "../../utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["mygigs"],
    queryFn: async () => {
      const response = await axios.get(`/gig?userId=${currentUser.id}`);
      return response.data;
    },
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mygigs"]);
    },
  });
console.log(data, 'gigdata')

  const handleDelete = (id) => {
    mutation.mutate(id)
  };
  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data?.map((gig) => (
              <tr key={gig.id}>
                <td>
                  <img
                   
                    className="image"
                    src={gig.cover}
                    alt=""
                  />
                </td>
                <td>{gig.title}</td>
                <td>
                 {gig.price}
                </td>
                {gig.sale}
                <td>
                  <img  onClick={() => handleDelete(gig._id)} className="delete" src="./img/delete.png" alt="" />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
