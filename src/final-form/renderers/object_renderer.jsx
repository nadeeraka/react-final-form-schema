import React from "react";
import { useFormSchema } from "../schema_context";
import {
  getDataSubPath,
  getSchemaSubPath,
  getUiSubPath
} from "../utils/schema_path_utils";
import {
  ObjectItemWrapper,
  ObjectWrapper
} from "../wrappers/component_wrappers";
import { SchemaRenderer } from "./schema_renderer";

/**
 * Render Object Type
 * @param {*} param0
 */
export function ObjectRenderer({ dataPath, schemaPath, uiPath, level }) {
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const { title, properties: schemaObj } = schema;
  return (
    <ObjectWrapper title={title} level={level}>
      {Object.keys(schemaObj).map(key => {
        const schemaSubPath = getSchemaSubPath(schemaPath, `properties.${key}`);
        const dataSubPath = getDataSubPath(dataPath, key);
        const uiSubPath = getUiSubPath(uiPath, key);
        return (
          <ObjectItemWrapper key={dataSubPath}>
            <SchemaRenderer
              dataPath={dataSubPath}
              schemaPath={schemaSubPath}
              uiPath={uiSubPath}
              level={level + 1}
            />
          </ObjectItemWrapper>
        );
      })}
    </ObjectWrapper>
  );
}
