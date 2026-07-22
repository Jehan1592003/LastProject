import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nationalIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (!/^\d+$/.test(value)) {
      return { nationalId: 'الرقم الوطني يجب أن يحتوي على أرقام فقط' };
    }

    if (value.length !== 9) {
      return { nationalId: 'الرقم الوطني يجب أن يكون 9 أرقام' };
    }

    return null;
  };
}