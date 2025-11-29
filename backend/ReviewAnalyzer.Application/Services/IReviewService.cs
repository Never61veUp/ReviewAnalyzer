using CSharpFunctionalExtensions;
using ReviewAnalyzer.Core.Model;

namespace ReviewAnalyzer.Application.Services;

public interface IReviewService
{
    Task<Result<IEnumerable<Review>>> GetByGroupId(Guid groupId, int count, CancellationToken cancellationToken);
}