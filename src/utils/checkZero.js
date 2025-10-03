export const checkIsZero = (value) => {
  if(value === null) return
  const strVal = String(value);
    const splitedValue = strVal.split('.');

    if(splitedValue.length === 1) {
      return splitedValue[0]
    }
    if(splitedValue[1] === '00' || splitedValue[1] === '0' || splitedValue[1] === 0) {
      return splitedValue[0]
    } else {
      return value
    }
   
  }