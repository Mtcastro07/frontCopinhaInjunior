import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import type { LoginFormData } from "../schemas/loginSchema";

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (dados: LoginFormData) => {
      const response = await api.post("/login", dados);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      navigate("/Dashboard");
    },
  });
}
