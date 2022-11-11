import { useState } from 'react';

export function useForm(
  initialState = {},
  validations = [] as any[],
  onSubmit: () => Promise<void>,
) {
  function validate(validations: any[], values: Record<string, unknown>) {
    const errors = validations
      .map((validation) => validation(values))
      .filter((validation) => typeof validation === 'object');
    return {
      isValid: errors.length === 0,
      errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
    };
  }

  const { isValid: initialIsValid, errors: initialErrors } = validate(validations, initialState);
  const [values, setValues] = useState<{ [x: string]: string }>(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(initialIsValid);
  const [touched, setTouched] = useState<{ [x: string]: boolean }>(initialState);

  const changeHandler = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };
    const newlyTouched = { ...touched, [name]: true };
    const { isValid, errors } = validate(validations, newValues);
    setValues(newValues);
    setIsValid(isValid);
    setErrors(errors);
    setValues(newValues);
    setTouched(newlyTouched);
  };
  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    void onSubmit();
  };
  return { values, changeHandler, isValid, errors, touched, submitHandler };
}
