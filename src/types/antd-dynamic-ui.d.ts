import React from "react";
import "antd-dynamic-ui";

declare module "antd-dynamic-ui" {
  export interface DynamicModalProps {
    children?: React.ReactNode;
  }
}
