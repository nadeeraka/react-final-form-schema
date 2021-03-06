import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Form } from 'react-bootstrap';
import { DatePickerProps } from '../../../../dist/interfaces/components.interfaces';
import { getErrorMessage } from './../../../wrappers/error_messages';
import {
  formatDate,
  formatDateRange,
  parseDate,
  parseDateRange,
} from '../date_utils';
import { ReactDateRangePicker } from './date_range_picker';

type Date = moment.Moment | null;

const DATE_FORMAT = 'YYYY-MM-DD';

ReactDatePicker.parse = parseDate;
ReactDatePicker.format = formatDate;

export function ReactDatePicker({
  label,
  input: { value, onChange, ...input },
  error,
}: DatePickerProps) {
  const [isFocussed, setIsFocussed] = useState<boolean>(false);
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <SingleDatePicker
        id={input.name}
        date={value}
        onDateChange={onChange}
        focused={!!isFocussed}
        onFocusChange={({ focused }) => setIsFocussed(!!focused)}
        isOutsideRange={() => false}
        small={true}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
