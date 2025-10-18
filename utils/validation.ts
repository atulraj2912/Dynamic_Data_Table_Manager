export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAge = (age: number | string): boolean => {
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
  return !isNaN(ageNum) && ageNum > 0 && ageNum < 150;
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateField = (fieldId: string, value: any): { valid: boolean; error?: string } => {
  if (!validateRequired(value)) {
    return { valid: false, error: 'This field is required' };
  }

  switch (fieldId) {
    case 'email':
      if (!validateEmail(value)) {
        return { valid: false, error: 'Invalid email format' };
      }
      break;
    case 'age':
      if (!validateAge(value)) {
        return { valid: false, error: 'Age must be a number between 1 and 149' };
      }
      break;
    case 'name':
    case 'role':
      if (typeof value === 'string' && value.trim().length < 2) {
        return { valid: false, error: 'Must be at least 2 characters' };
      }
      break;
  }

  return { valid: true };
};
