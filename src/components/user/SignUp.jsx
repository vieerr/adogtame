"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { FiX, FiUpload } from "react-icons/fi";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Password strength calculation
    if (id === "password") {
      const strength = Math.min(6, Math.floor(value.length / 2));
      setPasswordStrength(strength > 6 ? 6 : strength);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.passwordConfirmation)
      newErrors.passwordConfirmation = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp.email({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        image: image ? await convertImageToBase64(image) : "",
        callbackURL: "/dashboard",
        fetchOptions: {
          onResponse: () => setLoading(false),
          onRequest: () => setLoading(true),
          onError: (ctx) => toast.error(ctx.error.message),
          onSuccess: async () => {
            toast.success("Account created successfully!");
            router.push("/dashboard");
          },
        },
      });
    } catch (error) {
      toast.error("An error occurred during signup");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 card bg-base-100 shadow-2xl border border-base-200 w-1/2">
      <div className="card-body p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Create Your Account
          </h1>
          <p className="text-base-content/70">Join our community today</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className={`input input-bordered ${
                errors.firstName ? "input-error" : ""
              }`}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className="text-error text-sm mt-1">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              className={`input input-bordered ${
                errors.lastName ? "input-error" : ""
              }`}
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <span className="text-error text-sm mt-1">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={`input input-bordered ${
              errors.email ? "input-error" : ""
            }`}
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className="text-error text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            className={`input input-bordered ${
              errors.password ? "input-error" : ""
            }`}
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="mt-2">
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-full rounded-full transition-all ${
                    i < passwordStrength ? "bg-primary" : "bg-base-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-base-content/70">
              {passwordStrength < 3
                ? "Weak"
                : passwordStrength < 5
                ? "Good"
                : "Strong"}
            </span>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            className={`input input-bordered ${
              errors.passwordConfirmation ? "input-error" : ""
            }`}
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
          />
          {errors.passwordConfirmation && (
            <span className="text-error text-sm mt-1">
              {errors.passwordConfirmation}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Photo</span>
            <span className="label-text-alt">Optional</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FiUpload className="text-2xl text-base-content/30" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatarUpload"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-base-300/50 flex items-center justify-center"
              >
                <FiUpload className="text-xl text-primary" />
              </label>
            </div>
            {imagePreview && (
              <button
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="btn btn-circle btn-sm btn-ghost"
              >
                <FiX className="text-lg" />
              </button>
            )}
          </div>
        </div>

        <div className="form-control mt-6">
          <button
            className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        <p className="text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

async function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
