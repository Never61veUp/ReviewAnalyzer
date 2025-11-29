using CSharpFunctionalExtensions;
using ReviewAnalyzer.PostgreSql.Model;

namespace ReviewAnalyzer.Application.Services;

public interface IGroupReviewService
{
    Task<Result> AddGroupReview(byte[] csvBytes, string fileName, CancellationToken cancellationToken);
    Task<Result<IEnumerable<ReviewGroupEntity>>> GetAllGroups(CancellationToken cancellationToken);
}