const binarySearch = () => {
  let low = 0;
  let high = array.length - 1;
  while(low < high){
    let mid = parseInt((low + high) / 2);
    let guess = array[mid];
    if(guess === target){
      return mid;
    } else if (guess > target){
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

module.export = binarySearch;