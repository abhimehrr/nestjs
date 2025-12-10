// API Response
interface ApiResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
}

// API Success Response
interface ApiSuccessResponse extends ApiResponse {
  data?: any;
}
