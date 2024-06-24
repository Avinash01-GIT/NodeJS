const greetUser = (userName) => {
  console.log(`Hello, ${userName}`);
};

const greetWithSalutation = (saltutaion, userName) => {
  console.log(`Hello ${saltutaion}. ${userName}`);
};

const sayNamaste =(userName) => {
  console.log(`Namaste ${userName}`);
}

// export default greetUser; // ESM
module.exports = {
  greetUser,
  greetWithSalutation,
  sayNamaste
}; // CJS