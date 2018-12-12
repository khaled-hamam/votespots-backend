export function validateRegisterInput(body) {
  let isValid = true;
  const { name, email, password } = body;
  let msg = '';
  if (name === '' || !name) {
    msg = 'Please enter name.';
    isValid = false;
  }
  if (email === '' || !email) {
    msg = 'Please enter email.';
    isValid = false;
  }
  if (password === '' || !password) {
    msg = 'Please enter password';
    isValid = false;
  }
  return { isValid, msg };
}
