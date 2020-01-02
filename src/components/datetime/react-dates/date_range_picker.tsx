import moment from "moment";
import React, { useCallback, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePickerProps } from "../../../interfaces/components.interfaces";
import { Form } from "react-bootstrap";

interface DateRange {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

function getInitialValue(value: any): DateRange {
  if (!value) return { startDate: null, endDate: null };
  const { start, end } = value;
  const startDate = moment(start);
  const endDate = moment(end);
  return { startDate, endDate };
}

export function ReactDateRangePicker({
  label,
  input: { value, onChange, ...input }
}: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange>(getInitialValue(value));
  const [focusedInput, setFocuedInput] = useState<
    "startDate" | "endDate" | null
  >(null);
  const onChangeRange = useCallback(
    (val: DateRange) => {
      setRange(val);
      const { startDate, endDate } = val;
      const start = startDate === null ? null : startDate.valueOf();
      const end = endDate === null ? null : endDate.valueOf();
      const isValidRange = !!start && !!end;
      onChange(isValidRange ? { start, end } : null);
    },
    [onChange]
  );
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <DateRangePicker
        startDateId={input.name + "startDate"}
        endDateId={input.name + "endDate"}
        startDate={range.startDate}
        endDate={range.endDate}
        onDatesChange={onChangeRange}
        focusedInput={focusedInput}
        onFocusChange={setFocuedInput}
        isOutsideRange={() => false}
        small={true}
        // minDate={moment}
        // maxDate={moment}
      />
    </Form.Group>
  );
}