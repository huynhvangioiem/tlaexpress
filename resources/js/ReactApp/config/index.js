export const findIndex = (array, value, field) => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if(typeof item === "object"){
      if(item[field] == value) return i;
    }else{
      if(item == value) return i;
    }
  }
  return -1;
}