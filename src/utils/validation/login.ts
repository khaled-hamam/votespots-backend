export function validateLoginInput(body) {
  let isValid = true;
  const { email, password } = body;
  let msg = '';

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
