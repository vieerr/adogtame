"use client";

import { useState, useEffect } from "react";
import { FaSpinner, FaGoogle, FaGithub } from "react-icons/fa";
import { signIn, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/perros");
    }
  }, [session, router]);

  const validateForm = () => {
    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Correo electrónico inválido";
    if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signIn.email({ 
        email: formData.email, 
        password: formData.password 
      });
      toast.success("¡Bienvenido de nuevo!");
    } catch (error) {
      toast.error("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  if (session) return null;

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
      <div className="card-body p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Bienvenido de nuevo</h1>
          <p className="text-base-content/70">Inicia sesión para continuar tu viaje</p>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Correo electrónico</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="juan@ejemplo.com"
            className={`input input-bordered ${errors.email ? "input-error" : ""}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            id="password"
            type="password"
            className={`input input-bordered ${errors.password ? "input-error" : ""}`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <span className="text-error text-sm mt-1">{errors.password}</span>}
        </div>

        <div className="flex justify-between items-center">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="label-text">Recuérdame</span>
          </label>
          <Link href="/forgot-password" className="text-sm link link-hover">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>

        <p className="text-center text-sm text-base-content/70">
          ¿No tienes una cuenta?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Crea una
          </Link>
        </p>
      </div>
    </div>
  );
}
