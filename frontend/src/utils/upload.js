
import axios from "axios";

const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // Add your file data here
      formData.append("upload_preset", "fiverr"); // Add your upload preset name here

     

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/vivahjah/image/upload",
        formData
      );

      console.log("Image uploaded successfully:", response?.data);
      const {url} = response.data;
      return url

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

export default uploadImage;