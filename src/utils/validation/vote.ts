export function validateVoteInput(body) {
  let isValid = true;
  const { name, headers } = body;
  let msg = '';

  if (name === ' ' || !name) {
    msg = 'Please enter name';
    isValid = false;
  }

  if (!headers || headers.length === 0) {
    msg = 'please enter at least one header';
    isValid = false;
  }
  return { isValid, msg };
}
