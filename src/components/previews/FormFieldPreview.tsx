"use client";

import React from "react";
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
} from "antd-dynamic-ui";
import { ErrorApi } from "antd-dynamic-ui";

interface FormFieldPreviewProps {
  type: string;
}

export default function FormFieldPreview({ type }: FormFieldPreviewProps) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      testInput: "Sample text",
      testPassword: "secretPassword123",
      testSelect: "option2",
      testDate: "2026-11-21",
      testNumber: 42,
      testTextArea: "This is a multi-line text area content.",
      testSwitch: true,
      testCheckbox: true,
      testRadio: "b",
      testSlider: 65,
      testRating: 4,
      testColor: "#2563eb",
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
            label="Username / Handle"
            placeholder="Enter your username"
            tooltip="Must be 3-20 characters alphanumeric"
            required
          />
        );
      case "password-field":
        return (
          <PasswordField
            id="testPassword"
            control={ctrl}
            label="Account Password"
            placeholder="Enter password"
            tooltip="Minimum 8 characters with at least one number"
            required
          />
        );
      case "select-field":
        return (
          <SelectField
            id="testSelect"
            control={ctrl}
            label="Account Role"
            placeholder="Select a role"
            options={[
              { key: "admin", value: "Administrator" },
              { key: "editor", value: "Content Editor" },
              { key: "viewer", value: "Standard Viewer" },
            ]}
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
            />
            <p className="text-[11px] text-zinc-400">
              SelectApiField automatically debounces input queries and fetches from your endpoint.
            </p>
          </div>
        );
      case "date-field":
        return (
          <DateField
            id="testDate"
            control={ctrl}
            label="Scheduled Release Date"
            placeholder="Select date"
          />
        );
      case "date-range-field":
        return (
          <DateRangeField
            id="testDateRange"
            control={ctrl}
            label="Subscription Period"
          />
        );
      case "time-picker-field":
        return (
          <TimePickerField
            id="testTime"
            control={ctrl}
            label="Deployment Maintenance Window"
          />
        );
      case "time-range-field":
        return (
          <TimeRangeField
            id="testTimeRange"
            control={ctrl}
            label="Operating Business Hours"
          />
        );
      case "number-field":
        return (
          <NumberField
            id="testNumber"
            control={ctrl}
            label="Allocated Server Capacity"
            min={1}
            max={128}
          />
        );
      case "text-area-field":
        return (
          <TextAreaField
            id="testTextArea"
            control={ctrl}
            label="Service Description"
            placeholder="Provide architectural details..."
            rows={4}
          />
        );
      case "switch-field":
        return (
          <SwitchField
            id="testSwitch"
            control={ctrl}
            label="Enable Two-Factor Authentication"
          />
        );
      case "checkbox-field":
        return (
          <CheckboxField
            id="testCheckbox"
            control={ctrl}
            label="I accept the Enterprise Service Level Agreement"
          />
        );
      case "radio-field":
        return (
          <RadioField
            id="testRadio"
            control={ctrl}
            label="Subscription Billing Cycle"
            options={[
              { key: "monthly", value: "Billed Monthly ($49/mo)" },
              { key: "annual", value: "Billed Annually ($39/mo - Save 20%)" },
            ]}
          />
        );
      case "slider-field":
        return (
          <SliderField
            id="testSlider"
            control={ctrl}
            label="Storage Allocation Threshold (%)"
          />
        );
      case "rating-field":
        return (
          <RatingField
            id="testRating"
            control={ctrl}
            label="User Satisfaction Rating"
          />
        );
      case "color-picker-field":
        return (
          <ColorPickerField
            id="testColor"
            control={ctrl}
            label="Brand Accent Color"
          />
        );
      case "country-field":
        return (
          <CountryField
            id="testCountry"
            control={ctrl}
            label="Country of Incorporation"
          />
        );
      case "phone-field":
        return (
          <PhoneField
            id="testPhone"
            control={ctrl}
            label="Primary Contact Phone"
          />
        );
      case "otp-field":
        return (
          <OtpField
            id="testOtp"
            control={ctrl}
            length={6}
          />
        );
      case "upload-field":
        return (
          <UploadField
            id="testUpload"
            control={ctrl}
            title="Upload Files"
            subtitle="Drop documents or click to choose"
          />
        );
      case "button-field":
        return (
          <div className="flex gap-3">
            <ButtonField type="primary">Primary Action</ButtonField>
            <ButtonField type="default">Secondary Action</ButtonField>
            <ButtonField type="primary" danger>Destructive Action</ButtonField>
          </div>
        );
      case "loading-spinner":
        return (
          <div className="flex flex-col items-center justify-center p-8 space-y-3">
            <LoadingSpinner size="large" />
            <span className="text-xs text-zinc-500">Loading dataset...</span>
          </div>
        );
      case "error-api":
        return (
          <ErrorApi
            title="Service Cluster Unavailable"
            message="Failed to connect to backend cluster at port 8080. Connection timed out after 5000ms."
            onRetry={() => alert("Retrying request...")}
          />
        );
      default:
        return (
          <InputField
            id="testDefault"
            control={ctrl}
            label="Dynamic Field"
            placeholder="Enter value"
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <FormProvider {...methods}>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          {renderField()}
        </div>
      </FormProvider>

      <div className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center overflow-x-auto">
        <span className="shrink-0 mr-2">React Hook Form Live State:</span>
        <span className="font-mono text-blue-600 dark:text-blue-400 truncate">
          {JSON.stringify(formValues)}
        </span>
      </div>
    </div>
  );
}
