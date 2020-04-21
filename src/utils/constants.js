export const validatePhone = phone => {
  var regexp = /^(^\+62)(\d{3,4}-?){2}\d{3,4}$/g;
  return regexp.test(phone);
};
