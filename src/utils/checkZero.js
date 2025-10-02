export const checkIsZero = (value) => {
    const splitedValue = value.split('.');
    if(splitedValue[1] === '00' || splitedValue[1] === '0' || splitedValue[1] === 0) {
      return splitedValue[0]
    } else {
      return value
    }
   
  }