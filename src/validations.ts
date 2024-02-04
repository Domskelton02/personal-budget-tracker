export const isAllNumbers = (str: string) => {
    return !str.match(/[^0-9]/);
}

export const isValidPhoneNumber = (str: string) => {
    const regex = /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/;
    return regex.test(str);
  };
  