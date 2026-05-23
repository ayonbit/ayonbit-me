"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";
import { z } from "zod";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Textarea } from "../components/ui/textarea";

import { contactSchema } from "../lib/validation";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrorsType = Partial<Record<keyof FormDataType, string>>;

const ContactForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrorsType>({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrorsType]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));

    if (errors.service) {
      setErrors((prev) => ({
        ...prev,
        service: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);

      setErrors({});

      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrorsType = {};

        error.issues.forEach((err) => {
          const field = err.path[0] as keyof FormErrorsType;

          newErrors[field] = err.message;
        });

        setErrors(newErrors);
      }

      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const serverErrors: FormErrorsType = {};

          data.errors.forEach(
            (err: { field: keyof FormErrorsType; message: string }) => {
              serverErrors[err.field] = err.message;
            },
          );

          setErrors(serverErrors);

          throw new Error("Validation errors occurred");
        }

        throw new Error(data.message || "Failed to send message");
      }

      toast.success(data.message || "Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message !== "Validation errors occurred"
      ) {
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#27272c] p-4 sm:gap-6 sm:p-6 md:p-8"
        noValidate
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full py-3 sm:py-4"
            />

            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full py-3 sm:py-4"
            />

            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full py-3 sm:py-4"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full py-3 sm:py-4"
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Service Selection */}
        <div className="space-y-2">
          <Select value={formData.service} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full py-3 sm:py-4">
              <SelectValue placeholder="Select a Service" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Services</SelectLabel>

                <SelectItem value="Web Development">Web Development</SelectItem>

                <SelectItem value="UiUx Design">UI/UX Design</SelectItem>

                <SelectItem value="Shopify">Shopify DropShipping</SelectItem>

                <SelectItem value="Administrative Support">
                  Administrative Support
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.service && (
            <p className="mt-1 text-xs text-red-500">{errors.service}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="h-32 w-full sm:h-40 md:h-48"
            placeholder="Type your message here"
          />

          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mx-auto mt-4 w-full max-w-xs py-3 sm:mt-6 sm:w-auto sm:py-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
