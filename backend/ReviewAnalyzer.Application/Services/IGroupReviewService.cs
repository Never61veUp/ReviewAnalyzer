using CSharpFunctionalExtensions;

namespace ReviewAnalyzer.Application.Services;

public interface IGroupReviewService
{
    Task<Result> AddGroupReview(byte[] csvBytes, string fileName, CancellationToken cancellationToken);
}