const axios = require("axios");

const pageUrl = "https://internshala.com/jobs/jobs-in-hyderabad/";

const getPageData = async () => {
  try{
    const response = await axios.get(pageUrl);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPageData();