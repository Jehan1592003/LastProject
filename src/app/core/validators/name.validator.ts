import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    if (/\d/.test(value)) {
      return { name: 'الاسم لا يجب أن يحتوي على أرقام' };
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(value)) {
      return { name: 'الاسم يجب أن يحتوي على أحرف فقط' };
    }
    if (value.length < 3 || value.length > 50) {
      return { name: 'الاسم يجب أن يكون بين 3 و 50 حرف' };
    }

    return null;
  };
}