import React from "react";
import { Field } from "react-final-form";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { SelectField } from "../../components/select_field";

/**
 * Render select field for enums
 * * single value
 * * array
 * @param {*} param0
 */
export function renderEnumSelect({ schema, uiSchema, path, level }) {
  const isMultiple = schema.type === "array";
  const itemSchema = isMultiple ? schema.items : schema;
  const optionValues = itemSchema.enum;
  const optionLabels = itemSchema.enumNames;
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(path)}>
        {({ input, meta }) => (
          <SelectField
            label={schema.title}
            input={input}
            optionValues={optionValues}
            optionLabels={optionLabels}
            multiple={isMultiple}
            error={meta.touched && meta.error}
          ></SelectField>
        )}
      </Field>
    </FieldWrapper>
  );
}
