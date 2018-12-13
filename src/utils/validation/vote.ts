export function validateVoteInput(body) {
  let isValid = true;
  const { name } = body;
  let msg = '';

  if (name === ' ' || !name) {
    msg = 'Please enter name';
    isValid = false;
  }
  return { isValid, msg };
}
