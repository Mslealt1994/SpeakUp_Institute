"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import PhoneInput, { type Country, type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

// ─── Shared Types ────────────────────────────────────────────────────────────

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  srOnly?: boolean;
}

const inputBase =
  "w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-main placeholder:text-gray-medium " +
  "transition-colors duration-200 " +
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 " +
  "aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-400/20";

const labelBase =
  "block text-xs font-semibold uppercase tracking-wide text-main mb-1.5";
const hintBase = "mt-1.5 text-xs text-gray-medium";
const errorBase = "mt-1.5 text-xs text-red-500";

// ─── InputField ──────────────────────────────────────────────────────────────

export interface InputFieldProps
  extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  name: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, srOnly, name, className, ...inputProps }, ref) => {
    const id = `field-${name}`;

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className={cn(labelBase, srOnly && "sr-only")}>
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          name={name}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={cn(inputBase, className)}
          {...inputProps}
        />

        {hint && !error && (
          <p id={`${id}-hint`} className={hintBase}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} role="alert" className={errorBase}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";

// ─── TextareaField ───────────────────────────────────────────────────────────

export interface TextareaFieldProps
  extends
    BaseFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  name: string;
  maxLength?: number;
  currentLength?: number;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(
  (
    {
      label,
      error,
      hint,
      srOnly,
      name,
      maxLength,
      currentLength,
      className,
      ...textareaProps
    },
    ref,
  ) => {
    const id = `field-${name}`;

    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={id}
            className={cn(labelBase, "mb-0", srOnly && "sr-only")}
          >
            {label}
          </label>
          {maxLength && (
            <span
              className="text-xs text-gray-medium tabular-nums"
              aria-live="polite"
            >
              {currentLength ?? 0}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={id}
          name={name}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={cn(inputBase, "resize-none leading-relaxed", className)}
          {...textareaProps}
        />

        {hint && !error && (
          <p id={`${id}-hint`} className={hintBase}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} role="alert" className={errorBase}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
TextareaField.displayName = "TextareaField";

// ─── SelectField ─────────────────────────────────────────────────────────────
// Se mantiene por si se necesita en otros contextos del proyecto.
// En el formulario de contacto fue reemplazado por ChipGroupField.

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SelectFieldProps<T extends string = string>
  extends
    BaseFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> {
  name: string;
  options: ReadonlyArray<SelectOption<T>>;
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      error,
      hint,
      srOnly,
      name,
      options,
      placeholder,
      className,
      ...selectProps
    },
    ref,
  ) => {
    const id = `field-${name}`;

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className={cn(labelBase, srOnly && "sr-only")}>
          {label}
        </label>

        <select
          ref={ref}
          id={id}
          name={name}
          defaultValue=""
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={cn(inputBase, "cursor-pointer", className)}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {hint && !error && (
          <p id={`${id}-hint`} className={hintBase}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} role="alert" className={errorBase}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
SelectField.displayName = "SelectField";

// ─── PhoneField ───────────────────────────────────────────────────────────────
// Selector de país con bandera + input de número.
// value/onChange vienen del Controller — produce strings E.164 (+573001234567).
// defaultCountry determina el país preseleccionado al montar el componente.

export interface PhoneFieldProps extends Omit<BaseFieldProps, "srOnly"> {
  name: string;
  value?: Value;
  onChange: (value?: Value) => void;
  defaultCountry?: Country;
}

export function PhoneField({
  label,
  error,
  hint,
  name,
  value,
  onChange,
  defaultCountry = "CO",
}: PhoneFieldProps) {
  const id = `field-${name}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>

      {/*
        PhoneInput inyecta dos elementos hermanos dentro del wrapper:
          1. El <select> del país (con bandera)
          2. El <input> del número
        Los estilizamos a través del className del wrapper usando los
        selectores que expone la librería (.PhoneInputCountry, .PhoneInputInput).
      */}
      <div
        id={id}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        className={cn(
          // Wrapper — mismo look que inputBase pero sin px/py propios
          "flex items-center gap-2 rounded-lg border border-line bg-white",
          "transition-colors duration-200",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          error && "border-red-400 ring-2 ring-red-400/20",

          // Selector de país (bandera + chevron)
          "[&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center",
          "[&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:border-line",
          "[&_.PhoneInputCountry]:pl-3 [&_.PhoneInputCountry]:pr-2.5 [&_.PhoneInputCountry]:py-2.5",
          "[&_.PhoneInputCountrySelect]:absolute [&_.PhoneInputCountrySelect]:inset-0",
          "[&_.PhoneInputCountrySelect]:opacity-0 [&_.PhoneInputCountrySelect]:cursor-pointer",
          "[&_.PhoneInputCountrySelectArrow]:ml-1 [&_.PhoneInputCountrySelectArrow]:text-gray-medium",
          "[&_.PhoneInputCountryIcon]:w-5 [&_.PhoneInputCountryIcon]:h-auto",

          // Input del número
          "[&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent",
          "[&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2.5",
          "[&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:text-main",
          "[&_.PhoneInputInput]:placeholder:text-gray-medium",
          "[&_.PhoneInputInput]:focus:outline-none",
        )}
      >
        <PhoneInput
          id={id}
          value={value}
          onChange={onChange}
          defaultCountry={defaultCountry}
          placeholder="300 123 4567"
          international
          countryCallingCodeEditable={false}
        />
      </div>

      {hint && !error && (
        <p id={`${id}-hint`} className={hintBase}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className={errorBase}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── ChipGroupField ───────────────────────────────────────────────────────────

export interface ChipOption<T extends string = string> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}

export interface ChipGroupFieldProps<T extends string = string> extends Omit<
  BaseFieldProps,
  "srOnly"
> {
  name: string;
  options: ReadonlyArray<ChipOption<T>>;
  value?: T;
  onChange?: (value: T) => void;
  variant?: "card" | "pill";
  /** Grid de columnas: "auto" flex-wrap | "2" | "4" | "2x2" (2 móvil, 4 desktop) */
  gridCols?: "auto" | "2" | "4" | "2x2";
}

export function ChipGroupField<T extends string = string>({
  label,
  error,
  hint,
  name,
  options,
  value,
  onChange,
  gridCols = "auto",
}: ChipGroupFieldProps<T>) {
  const id = `field-${name}`;

  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
    >
      <p id={`${id}-label`} className={labelBase}>
        {label}
      </p>

      <div
        className={cn(
          "gap-2",
          gridCols === "auto" && "flex flex-wrap",
          gridCols === "2" && "grid grid-cols-2",
          gridCols === "4" && "grid grid-cols-4",
          gridCols === "2x2" && "grid grid-cols-2 sm:grid-cols-4",
        )}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const Icon = opt.icon;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange?.(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-start rounded-lg border px-3.5 py-2.5 text-left text-sm",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                isSelected
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-line bg-white text-main hover:border-primary/50 hover:bg-soft",
              )}
            >
              {Icon && (
                <Icon
                  size={16}
                  strokeWidth={2}
                  className={cn(
                    "mb-1.5",
                    isSelected ? "text-white" : "text-gray-medium",
                  )}
                />
              )}
              <span className="font-medium leading-tight">{opt.label}</span>
              {opt.sublabel && (
                <span
                  className={cn(
                    "mt-0.5 text-xs leading-tight",
                    isSelected ? "text-white/80" : "text-gray-medium",
                  )}
                >
                  {opt.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {hint && !error && (
        <p id={`${id}-hint`} className={hintBase}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className={errorBase}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── CheckboxField ───────────────────────────────────────────────────────────

export interface CheckboxFieldProps extends Omit<
  BaseFieldProps,
  "label" | "srOnly"
> {
  name: string;
  label: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, hint, name, checked, onChange, ...inputProps }, ref) => {
    const id = `field-${name}`;

    return (
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line",
              "accent-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            )}
            {...inputProps}
          />
          <label
            htmlFor={id}
            className="cursor-pointer text-sm text-main leading-snug"
          >
            {label}
          </label>
        </div>

        {hint && !error && (
          <p id={`${id}-hint`} className={cn(hintBase, "ml-7")}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} role="alert" className={cn(errorBase, "ml-7")}>
            {error}
          </p>
        )}
      </div>
    );
  },
);
CheckboxField.displayName = "CheckboxField";

// ─── ControlledField ─────────────────────────────────────────────────────────

export interface ControlledFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  render: (field: {
    value: TFieldValues[TName];
    onChange: (...event: unknown[]) => void;
    onBlur: () => void;
    ref: React.Ref<unknown>;
  }) => React.ReactElement;
}

export function ControlledField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, render }: ControlledFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => render(field as Parameters<typeof render>[0])}
    />
  );
}
