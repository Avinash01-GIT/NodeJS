const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const xlsx = require("xlsx");

const pageUrl = "https://internshala.com/jobs/jobs-in-hyderabad/";

const fetch = async () => {
  const response = await axios.get(pageUrl, {
    Headers: {
      "Content-Type": "text/html",
    },
  });
  const data = response.data;

  fs.writeFileSync("data.json", data);
  console.log("File writtent sucessfully");
};

// fetch();

const data = fs.readFileSync("data.json");

const $ = cheerio.load(data.toString());

//JOB name [Titles]
const titles = $(".job-internship-name");
const jobTitle = [];
titles.each((index, job) => {
  jobTitle.push($(job).text().trim());
});
// console.log(jobTitle);

// Company Names
const company = $(".company-name");
const companies = [];
company.each((index, comp) => {
  companies.push($(comp).text().trim());
});
// console.log(companies);

// Location
const location = $(".row-1-item.locations span a");
const locationArray = [];
location.each((index, loca) => {
  locationArray.push($(loca).text().trim());
});
// console.log(locationArray);

//Posted date
const postDate = $(".status-success span");
const postedArray = [];
postDate.each((index, item) => {
  postedArray.push($(item).text());
});

console.log(postedArray);

// Converting to JSON

const details = [];
jobTitle.map((item, index) => {
  details.push({
    title: item,
    company: companies[index],
    location: locationArray[index],
    postDate: postedArray[index],
  });
});

// console.log(details);

// fs.writeFileSync("job.json",JSON.stringify(details));

const workbook = xlsx.utils.book_new("workbook");
const sheet = xlsx.utils.json_to_sheet(details);
xlsx.utils.book_append_sheet(workbook, sheet, "jobDetails");
xlsx.writeFile(workbook, "job.xlsx");

console.log("XLSX file created successfully!");
