import axios from "axios";
import { useAuthStore } from "../../features/auth/store/authStore.js";

// ================= AXIOS AUTH =================
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.request.use((config) => {
  config._axiosClient = "auth";

  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AXIOS ADMIN =================
const axiosAdmin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAdmin.interceptors.request.use((config) => {
  config._axiosClient = "admin";

  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= REFRESH TOKEN =================
let _isRefreshing = false;
let failedQueue = [];

function _processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  failedQueue = [];
}

const handleRefreshToken = async (error) => {
  const original = error.config;

  if (!original || original._retry) {
    return Promise.reject(error);
  }

  const status = error.response?.status;
  const errorCode = error.response?.data?.error;
  const requestUrl = original.url || "";

  const isRefreshEndpoint = requestUrl.includes("/auth/refresh");

  const shouldRefresh =
    !isRefreshEndpoint &&
    (status === 401 || (status === 403 && errorCode === "TOKEN_EXPIRED"));

  if (shouldRefresh) {
    const retryClient =
      original._axiosClient === "admin" ? axiosAdmin : axiosAuth;

    if (_isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = "Bearer " + token;
        return retryClient(original);
      });
    }

    original._retry = true;
    _isRefreshing = true;

    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    try {
      const response = await axiosAuth.post("/auth/refresh", {
        refreshToken,
      });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
        userDetails,
      } = response.data;

      useAuthStore.setState({
        token: accessToken,
        refreshToken: newRefreshToken,
        expiresAt: expiresIn,
        user: userDetails,
        isAuthenticated: true,
      });

      _processQueue(null, accessToken);

      original.headers.Authorization = "Bearer " + accessToken;

      return retryClient(original);

    } catch (err) {
      _processQueue(err, null);
      useAuthStore.getState().logout();
      return Promise.reject(err);
    } finally {
      _isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

// ================= INTERCEPTORS =================
axiosAuth.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Auth API no disponible");
    }
    return handleRefreshToken(error);
  }
);

axiosAdmin.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Admin API no disponible");
    }
    return handleRefreshToken(error);
  }
);

// ================= EXPORTS =================
export { axiosAuth, axiosAdmin, handleRefreshToken };