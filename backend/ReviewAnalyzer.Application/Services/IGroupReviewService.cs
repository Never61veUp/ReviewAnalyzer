using CSharpFunctionalExtensions;

namespace ReviewAnalyzer.Application.Services;

public interface IGroupReviewService
{
    Task<Result> AddGroupReview(byte[] csvBytes, string fileName, CancellationToken cancellationToken);
    Task<Result> GetAllGroups(CancellationToken cancellationToken);
}