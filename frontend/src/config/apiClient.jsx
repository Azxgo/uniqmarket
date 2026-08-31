const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = async (endpoint, options = {}) => {
    const headers = new Headers(options.headers);

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });
};