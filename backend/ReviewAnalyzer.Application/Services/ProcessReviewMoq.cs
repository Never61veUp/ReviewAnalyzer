using System.Text;
using CSharpFunctionalExtensions;
using Microsoft.Extensions.Logging;

namespace ReviewAnalyzer.Application.Services;

public class ProcessReviewMoq : IProcessReview
{
    private readonly ILogger<ProcessReview> _logger;

    public ProcessReviewMoq(ILogger<ProcessReview> logger)
    {
        _logger = logger;
    }

    public async Task<Result<byte[]>> AnalyzeCsvAsync(byte[] csvBytes, string fileName, CancellationToken cancellationToken)
    {
        try
        {
            var inputCsv = Encoding.UTF8.GetString(csvBytes);

            var lines = inputCsv.Split('\n', StringSplitOptions.RemoveEmptyEntries);

            if (lines.Length == 0)
            {
                return Result.Failure<byte[]>("CSV is empty");
            }

            var header = lines[0] + ",label";
            var body = lines.Skip(1).Select(l => l + ",MOCK_LABEL");

            var resultCsv = header + "\n" + string.Join("\n", body);

            var resultBytes = Encoding.UTF8.GetBytes(resultCsv);

            return Result.Success(resultBytes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure<byte[]>(ex.Message);
        }
    }

}