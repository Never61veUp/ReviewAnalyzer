using CSharpFunctionalExtensions;
using ReviewAnalyzer.Core.Model;
using ReviewAnalyzer.PostgreSql.Model;

namespace ReviewAnalyzer.PostgreSql.Repositories;

public interface IReviewRepository
{
    Task<Result<IEnumerable<ReviewEntity>>> GetReviewsByGroupId(Guid groupId, int count = -1, CancellationToken cancellationToken = default);
    Task<Result> AddReviewAsync(ReviewEntity reviewEntity, CancellationToken cancellationToken);
    Task<Result> AddReviewsAsync(IEnumerable<ReviewEntity> reviewEntity, CancellationToken cancellationToken);
    Task<Result<IEnumerable<ReviewEntity>>> GetReviewsByTitle(string title, int count = -1, CancellationToken cancellationToken = default);
    Task<Result<int>> GetReviewCount(CancellationToken cancellationToken =  default);
    Task<Result<double>> GetPercentPositiveReview(CancellationToken cancellationToken =  default);
    Task<Result<int>> GetPositiveReviewCount(CancellationToken cancellationToken = default);
    Task<Result<int>> GetLabelReviewCountInGroup(Guid groupId, CancellationToken cancellationToken = default, Label label = Label.Положительный);
    Task<Result<double>> GetPercentPositiveReviewInGroup(Guid groupId, CancellationToken cancellationToken = default);
    Task<Result<Dictionary<string, double>>> GetPositiveSrcPercentList(Guid groupId, CancellationToken cancellationToken =  default);
}