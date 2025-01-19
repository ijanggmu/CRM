import { toast } from 'sonner';

export class ErrorHandler {
  static handle(error: any) {
    console.error('Error:', error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          toast.error('Invalid request. Please check your input.');
          break;
        case 401:
          toast.error('Please log in to continue.');
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('The requested resource was not found.');
          break;
        case 500:
          toast.error('An internal server error occurred. Please try again later.');
          break;
        default:
          toast.error('An unexpected error occurred. Please try again.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
  }
}