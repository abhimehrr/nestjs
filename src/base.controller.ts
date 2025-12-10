export class BaseController {
  protected ok({
    success = true,
    statusCode = 200,
    message = 'Operation Successful.',
    data = undefined,
  }: ApiSuccessResponse) {
    return {
      success,
      statusCode,
      message,
      data,
    };
  }
}
