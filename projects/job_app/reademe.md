1. APIS
 1. Creat job api
 2. list job
 3. edit job
 4. delete job
 5. Apply job api
2. connecting to mongo with Node
3. depolyment of Backend

MVC

for mongodb
collections -> jobs -> feilds

example:
{
  "title": "Software Engineer",
  "description": "Join our dynamic team and contribute to cutting-edge software development projects.",
  "company": "Tech Innovations Inc.",
  "location": "Cityville, USA",
  "salary": 80000
}

 Schema:
{
  title: {
    type: string
  },
  descriptioon: {
    type: string
  },
  company: {
    type: string
  },
  salary: {
    type: Number
  }
}

to connect node with monoDB we use mongoose,
in index.js file we will connect to database 
in model jobs.js we will declare and connect the collection name "jobs" in the data base and fields (JobSchema)  