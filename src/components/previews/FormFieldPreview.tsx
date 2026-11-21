"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  InputField,
  PasswordField,
  SelectField,
  DateField,
  DateRangeField,
  TimePickerField,
  TimeRangeField,
  NumberField,
  TextAreaField,
  SwitchField,
  CheckboxField,
  RadioField,
  SliderField,
  RatingField,
  ColorPickerField,
  CountryField,
  PhoneField,
  OtpField,
  UploadField,
  ButtonField,
  LoadingSpinner,
  ErrorApi,
} from "antd-dynamic-ui";
import { Switch, message, Button, Tag } from "antd";
import { CheckCircle2, Sliders, Sparkles } from "lucide-react";

interface FormFieldPreviewProps {
  type: string;
  exampleIndex?: number;
}

export default function FormFieldPreview({ type, exampleIndex = 0 }: FormFieldPreviewProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [submitOutput, setSubmitOutput] = useState<any>(null);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      testInput: "Sample text",
      testPassword: "secretPassword123",
      testSelect: "editor",
      testDate: undefined,
      testDateRange: undefined,
      testTime: undefined,
      testTimeRange: undefined,
      testNumber: 42,
      testTextArea: "This is a multi-line text area content for enterprise use.",
      testSwitch: true,
      testCheckbox: true,
      testRadio: "b",
      testSlider: 65,
      testRating: 4,
      testColor: "#e05d44",
      testCountry: "US",
      testPhone: "+1 (555) 019-2834",
      testOtp: "123456",
    },
  });

  const formValues = methods.watch();
  const ctrl = methods.control as any;

  const renderField = () => {
    switch (type) {
      case "input-field":
        return (
          <InputField
            id="testInput"
            control={ctrl}
            label={exampleIndex === 1 ? "Complete Enterprise Username (With Tooltip & Help)" : "Username / Handle"}
            placeholder="Enter your username"
            tooltip="Must be 3-20 characters alphanumeric"
            required={exampleIndex > 0}
            disabled={isDisabled}
          />
        );
      case "password-field":
        return (
          <PasswordField
            id="testPassword"
            control={ctrl}
            label={exampleIndex === 1 ? "Encrypted Master Password (Audited)" : "Account Password"}
            placeholder="Enter password"
            tooltip="Minimum 8 characters with at least one number"
            required={exampleIndex > 0}
            disabled={isDisabled}
          />
        );
      case "select-field":
        return (
          <SelectField
            id="testSelect"
            control={ctrl}
            label="Account Role & Permissions"
            placeholder="Select a role"
            options={[
              { key: "admin", value: "Administrator (Full Root Access)" },
              { key: "editor", value: "Content Editor (Publish & Draft)" },
              { key: "viewer", value: "Standard Viewer (Read Only)" },
            ]}
            disabled={isDisabled}
          />
        );
      case "select-api-field":
      case "autocomplete-select":
        return (
          <div className="space-y-2">
            <SelectField
              id="testSelectApi"
              control={ctrl}
              label="Remote Data Select (Async Debounced Search)"
              placeholder="Type to search remote users..."
              options={[
                { key: "usr_1", value: "Dr. Gregory House (Diagnostic Medicine)" },
                { key: "usr_2", value: "Dr. James Wilson (Oncology)" },
                { key: "usr_3", value: "Dr. Lisa Cuddy (Administration)" },
              ]}
              disabled={isDisabled}
            />
            <p className="text-[11px] text-[#785c4b]">
              Automatically debounces search keystrokes and updates options asynchronously.
            </p>
          </div>
        );
      case "date-field":
        return (
          <DateField
            id="testDate"
            control={ctrl}
            label="Effective Launch Date"
            placeholder="Select date"
            disabled={isDisabled}
          />
        );
      case "date-range-field":
        return (
          <DateRangeField
            id="testDateRange"
            control={ctrl}
            label="Subscription Period (Start & End)"
            disabled={isDisabled}
          />
        );
      case "time-picker-field":
        return (
          <TimePickerField
            id="testTime"
            control={ctrl}
            label="Daily Maintenance Window"
            disabled={isDisabled}
          />
        );
      case "time-range-field":
        return (
          <TimeRangeField
            id="testTimeRange"
            control={ctrl}
            label="Operating Shift Hours"
            disabled={isDisabled}
          />
        );
      case "number-field":
        return (
          <NumberField
            id="testNumber"
            control={ctrl}
            label="Allocation Count"
            placeholder="Enter number"
            min={1}
            max={100}
            disabled={isDisabled}
          />
        );
      case "text-area-field":
        return (
          <TextAreaField
            id="testTextArea"
            control={ctrl}
            label="System Audit Notes"
            placeholder="Enter multi-line notes..."
            rows={4}
            disabled={isDisabled}
          />
        );
      case "switch-field":
        return (
          <SwitchField
            id="testSwitch"
            control={ctrl}
            label="Enable Two-Factor Authentication"
            disabled={isDisabled}
          />
        );
      case "checkbox-field":
        return (
          <CheckboxField
            id="testCheckbox"
            control={ctrl}
            label="I accept terms and enterprise SLA policies"
            disabled={isDisabled}
          />
        );
      case "radio-field":
        return (
          <RadioField
            id="testRadio"
            control={ctrl}
            label="Notification Frequency"
            options={[
              { key: "a", value: "Instant Push" },
              { key: "b", value: "Daily Digest" },
              { key: "c", value: "Weekly Summary" },
            ]}
            disabled={isDisabled}
          />
        );
      case "slider-field":
        return (
          <SliderField
            id="testSlider"
            control={ctrl}
            disabled={isDisabled}
          />
        );
      case "rating-field":
        return (
          <RatingField
            id="testRating"
            control={ctrl}
            label="Customer Satisfaction Score"
            disabled={isDisabled}
          />
        );
      case "color-picker-field":
        return (
          <ColorPickerField
            id="testColor"
            control={ctrl}
            label="Brand Accent Color"
            disabled={isDisabled}
          />
        );
      case "country-field":
        return (
          <CountryField
            id="testCountry"
            control={ctrl}
            label="Jurisdiction / Country"
            disabled={isDisabled}
          />
        );
      case "phone-field":
        return (
          <PhoneField
            id="testPhone"
            control={ctrl}
            label="Primary Contact Phone"
            disabled={isDisabled}
          />
        );
      case "otp-field":
        return (
          <OtpField
            id="testOtp"
            control={ctrl}
            length={6}
            disabled={isDisabled}
          />
        );
      case "upload-field":
        return (
          <UploadField
            id="testUpload"
            control={ctrl}
            title="Upload Legal Documentation"
            subtitle="Drop files or click to browse S3 bucket"
            disabled={isDisabled}
          />
        );
      case "button-field":
        return (
          <div className="flex flex-wrap gap-3 items-center">
            <ButtonField
              type="primary"
              loading={btnLoading}
              onClick={async () => {
                setBtnLoading(true);
                await new Promise((r) => setTimeout(r, 1000));
                setBtnLoading(false);
                message.success("Primary button operation complete!");
              }}
            >
              Primary Action
            </ButtonField>
            <ButtonField type="default" onClick={() => message.info("Default button clicked")}>
              Secondary Action
            </ButtonField>
            <ButtonField type="primary" danger onClick={() => message.error("Destructive button clicked")}>
              Destructive Action
            </ButtonField>
          </div>
        );
      case "loading-spinner":
        return (
          <div className="flex flex-col items-center justify-center p-8 space-y-3">
            <LoadingSpinner size={exampleIndex === 1 ? "large" : "default"} />
            <span className="text-xs text-[#785c4b] font-medium">Loading remote dataset...</span>
          </div>
        );
      case "error-api":
        return (
          <ErrorApi
            title="Service Cluster Unavailable"
            message="Failed to connect to backend cluster at port 8080. Connection timed out after 5000ms."
            onRetry={() => message.loading({ content: "Re-establishing connection...", duration: 0.8 })}
          />
        );
      default:
        return (
          <InputField
            id="testDefault"
            control={ctrl}
            label="Dynamic Field"
            placeholder="Enter value"
            disabled={isDisabled}
          />
        );
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls Bar for Example 2 & 3 */}
      {exampleIndex > 0 && type !== "button-field" && type !== "loading-spinner" && type !== "error-api" && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#f5eee3] rounded-xl border border-[#ede5d8] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#362117]">Toggle Props:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#5c4738]">disabled:</span>
              <Switch
                size="small"
                checked={isDisabled}
                onChange={(c) => setIsDisabled(c)}
                style={{ backgroundColor: isDisabled ? "#e05d44" : undefined }}
              />
            </div>
          </div>
          <span className="text-[11px] text-[#785c4b]">
            {isDisabled ? "Input is disabled (read-only)" : "Input is active & editable"}
          </span>
        </div>
      )}

      <FormProvider {...methods}>
        <div className="w-full py-1">
          {renderField()}
        </div>
      </FormProvider>

      {/* Live Form Submission Trigger for Example 2 */}
      {exampleIndex === 2 && (
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={methods.handleSubmit((data) => {
              setSubmitOutput(data);
              message.success("Field payload validated!");
            })}
            className="w-full text-xs font-bold py-2 px-4 rounded-xl bg-[#362117] hover:bg-[#261710] text-white shadow-xs transition-colors cursor-pointer"
          >
            Submit & Inspect Validated Value
          </button>

          {submitOutput && (
            <div className="p-3 bg-[#edf7ee] border border-[#c8e6c9] rounded-xl text-xs text-[#2e7d32] font-mono">
              <span className="font-bold">Output: </span>
              {JSON.stringify(submitOutput)}
            </div>
          )}
        </div>
      )}

      {/* State inspector */}
      <div className="text-xs text-[#785c4b] bg-[#f5eee3] p-3 rounded-xl border border-[#ede5d8] flex justify-between items-center overflow-x-auto shadow-xs">
        <span className="shrink-0 mr-2 font-bold text-[#362117]">React Hook Form Live State:</span>
        <span className="font-mono text-[#c4432b] font-bold truncate">
          {JSON.stringify(formValues)}
        </span>
      </div>
    </div>
  );
}
