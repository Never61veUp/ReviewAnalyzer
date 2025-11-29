using CSharpFunctionalExtensions;
using ReviewAnalyzer.Core.Model;

namespace ReviewAnalyzer.Application.Services;

public interface IReviewService
{
    Task<Result<IEnumerable<Review>>> GetByGroupId(Guid groupId, CancellationToken cancellationToken = default, int count = -1);
    Task<Result<IEnumerable<Review>>> FilterTitle(string title, CancellationToken cancellationToken = default, int count = -1);
    Task<Result<int>> GetReviewCount(CancellationToken cancellationToken = default);
    Task<Result<double>> GetPercentPositiveReview(CancellationToken cancellationToken = default);
    Task<Result<int>> GetPositiveReviewCount(CancellationToken cancellationToken = default);
    Task<Result<double>> GetPercentPositiveReviewInGroup(Guid groupId, CancellationToken cancellationToken = default);
    Task<Result<int>> GetPositiveReviewCountInGroup(Guid groupId, CancellationToken cancellationToken = default);
}