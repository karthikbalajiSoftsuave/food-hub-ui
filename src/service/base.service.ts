import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

class BaseAxios {
  axiosInstance: AxiosInstance;
  public endpoints: string[] = ["login", "signup"]

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://13.201.247.48/api/"
    });

    // Set up a request interceptor to attach the access token to requests
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        if (this.endpoints.includes(config.url)) {
          return config;
        }
        const accessToken = this.getAccessToken();
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Set up a response interceptor to handle 401 errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          // Handle 401 error (e.g., refresh token logic)
          this.handle401Error();
        }
        return Promise.reject(error);
      }
    );
  }

  getAccessToken(): string | null {
    // Implement your logic to retrieve the access token
    // from your authentication system or storage
    return localStorage.getItem("accessToken");
  }

  handle401Error(): void {
    // Implement your logic to handle a 401 error
    // (e.g., redirect to login or refresh token)
  }

  get<T = any>(url: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url);
  }

  post<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data);
  }

  put<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data);
  }

  delete<T = any>(url: string): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url);
  }
}

const BaseService = new BaseAxios();
export default BaseService;
