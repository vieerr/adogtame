"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { FiX, FiUpload } from "react-icons/fi";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dogs: [],
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
        toast.error("El tamaño de la imagen debe ser menor a 2MB");
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
    if (!formData.firstName) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName) newErrors.lastName = "El apellido es obligatorio";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Correo electrónico inválido";
    if (formData.password.length < 8)
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (formData.password !== formData.passwordConfirmation)
      newErrors.passwordConfirmation = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { imageUrl } = await uploadImageMutation.mutateAsync(image);

      await signUp.email({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
        image: imageUrl, 
        callbackURL: "/perros",
        fetchOptions: {
          onResponse: () => setLoading(false),
          onRequest: () => setLoading(true),
          onError: (ctx) => toast.error(ctx.error.message),
          onSuccess: async () => {
            toast.success("¡Cuenta creada con éxito!");
            router.push("/perros");
          },
        },
      });
      toast.success("¡Cuenta creada con éxito!");
    } catch (error) {
      toast.error("Ocurrió un error durante el registro");
      setLoading(false);
    }
  };

  const uploadImageMutation = useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Error al subir la imagen");
      return response.json();
    },
  });

  return (
    <div className="mt-10 card bg-base-100 shadow-2xl border border-base-200 w-1/3">
      <div className="card-body p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Crea tu cuenta
          </h1>
          <p className="text-base-content/70">Únete a nuestra comunidad hoy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre</span>
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
              <span className="label-text">Apellido</span>
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
            <span className="label-text">Correo Electrónico</span>
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
            <span className="label-text">Contraseña</span>
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
                ? "Débil"
                : passwordStrength < 5
                ? "Buena"
                : "Fuerte"}
            </span>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirmar Contraseña</span>
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
            <span className="label-text">Foto de Perfil</span>
            <span className="label-text-alt">Opcional</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Vista previa de perfil"
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
                Creando Cuenta...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </div>

        <p className="text-center text-sm text-base-content/70">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
