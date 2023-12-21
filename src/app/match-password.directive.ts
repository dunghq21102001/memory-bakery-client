import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[matchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true
  }]
})
export class MatchPasswordDirective implements Validator {
  @Input('matchPassword') password!: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    const passwordControl = control.root.get(this.password);
    if (passwordControl && control.value !== passwordControl.value) {
      return { 'matchPassword': true };
    }
    return null;
  }
}
