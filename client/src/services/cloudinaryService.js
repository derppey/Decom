import Axios from 'axios';
export const cloudinaryService = {
  uploadPfp: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nrk4nxpq');

    const res = await Axios.post('https://api.cloudinary.com/v1_1/decom/image/upload', formData);
    if (res.status === 200) {
      return res.data.url;
    } else {
      console.log(res);
      return 'Failed';
    }
  }

};