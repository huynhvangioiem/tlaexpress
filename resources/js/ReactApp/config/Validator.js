export const Validator = (validateDatas) => {
  var resultValidate = true;
  validateDatas.forEach(validateObj => {
    for (let i = 0; i < validateObj.rules.length; i++) {
      var rule = validateObj.rules[i];
      if(!rule.func(validateObj.objName, rule.checkValue, rule.message )) {
        resultValidate = false;
        break;
      }
    }
  });
  return resultValidate;
}

const getInputElm = (selector) => {
  return document.querySelector(selector);
}

const getErrorElm = (inputElement) => {
  return inputElement.parentElement.parentElement.querySelector(".form-message");
}

export const Required = (objCheck, checkValue = null, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement)
  if (!inputElement.value) {
    errorElement.innerText = message || "Vui lòng nhập trường này!";
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}

export const Phonenumber = (objCheck, checkValue = null, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement)
  var regex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
  if (!regex.test(inputElement.value)) {
    errorElement.innerText = message || "Vui lòng nhập vào số điện thoại hợp lệ!";
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}


export const Password = (objCheck, checkValue = null, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement)
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  if (!regex.test(inputElement.value)) {
    errorElement.innerText = message || 'Mật khẩu có độ dài từ 8 ký tự trong đó bao gồm chữ cái viết thường, chữ viết hoa, chữ số và ký tự đặc biệt.';
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}

export const Email = (objCheck, checkValue = null, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement)
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(inputElement.value)) {
    errorElement.innerText = message || 'Vui lòng nhập vào email hợp lệ!';
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}

export const Comfirm = (objCheck, checkValue, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement);
  if (inputElement.value != checkValue) {
    errorElement.innerText = message || 'Xác thực không trùng khớp!';
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}

export const notIs = (objCheck, checkValue, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement);
  if (inputElement.value === checkValue) {
    errorElement.innerText = message || 'Dữ liệu không được trùng nhau!';
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}

export const Max = (objCheck, checkValue, message) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement);
  if (inputElement.value.length > checkValue) {
    errorElement.innerText = message || `Giá trị nhập vào không được vượt quá ${checkValue} ký tự`;
    errorElement.parentElement.classList.add('invalid');
    return false;
  }
  return true;
}

export const clearValidate = (objCheck) => {
  let inputElement = getInputElm(objCheck);
  let errorElement = getErrorElm(inputElement);
  errorElement.innerText = "";
  errorElement.parentElement.classList.remove('invalid');
}