import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';

export default class StringField extends GenericField {
  constructor(
    name,
    label,
    {
      required = false,
      min = undefined,
      max = undefined,
      matches = undefined,
    } = {},
  ) {
    super(name, label);

    this.required = required;
    this.matches = matches;
    this.min = min;
    this.max = max;
  }

  forView(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value;
  }

  forForm() {
    let yupChain = yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    if (this.matches) {
      yupChain = yupChain.matches(this.matches);
    }

    return yupChain;
  }

  forFilter() {
    return yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    if (this.matches) {
      yupChain = yupChain.matches(this.matches);
    }

    return yupChain;
  }
}
