using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;
using ReviewAnalyzer.Core.Model;
using ReviewAnalyzer.PostgreSql.Model;

namespace ReviewAnalyzer.PostgreSql.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly ReviewDbContext _context;

    public ReviewRepository(ReviewDbContext context)
    {
        _context = context;
    }

    public async Task<Result<IEnumerable<ReviewEntity>>> GetReviewsByGroupId(Guid groupId, int count, CancellationToken cancellationToken)
    {
        IQueryable<ReviewEntity> query = _context.Reviews
            .AsNoTracking()
            .Where(r => r.GroupId == groupId)
            .OrderBy(r => r.Index);

        if (count > 0)
            query = query.Take(count);

        var reviewEntities = await query.ToListAsync(cancellationToken);

        if (reviewEntities.Count == 0)
            return Result.Failure<IEnumerable<ReviewEntity>>("No reviews found for the specified group ID.");

        return Result.Success<IEnumerable<ReviewEntity>>(reviewEntities);
    }

    public Task<Result> AddReviewAsync(ReviewEntity reviewEntity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<Result> AddReviewsAsync(IEnumerable<ReviewEntity> reviewEntity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<IEnumerable<ReviewEntity>>> GetReviewsByTitle(
        string title,
        int count,
        CancellationToken cancellationToken)
    {
        try
        {
            var query = _context.Reviews
                .Where(r => EF.Functions.ILike(r.Text, $"%{title}%"));
            if (count > 0)
                query = query.Take(count);
            var reviews = await query
                .OrderBy(r => r.Id)
                .ToListAsync(cancellationToken);

            if (reviews.Count == 0)
                return Result.Failure<IEnumerable<ReviewEntity>>("No reviews found.");
            
            return Result.Success<IEnumerable<ReviewEntity>>(reviews);
        }
        catch (Exception ex)
        {
            return Result.Failure<IEnumerable<ReviewEntity>>(ex.Message);
        }
    }

    public async Task<Result<int>> GetReviewCount(CancellationToken cancellationToken)
    {
        var result = await _context.Reviews.CountAsync(cancellationToken: cancellationToken);
        return Result.Success(result);
    }
    
    public async Task<Result<double>> GetPercentPositiveReview(CancellationToken cancellationToken)
    {
        var data = await _context.Reviews
            .GroupBy(r => 1)
            .Select(g => new
            {
                Total = g.Count(),
                Positive = g.Count(r => r.Labels == Label.Положительный)
            })
            .FirstOrDefaultAsync(cancellationToken);
        
        if(data == null || data.Total == 0)
            return Result.Failure<double>("No records found for the specified group ID.");
        
        var percent = data.Total == 0 ? 0 : (double)data.Positive / data.Total * 100;
        return Result.Success(percent);
    }
    
    public async Task<Result<int>> GetPositiveReviewCount(CancellationToken cancellationToken)
    {
        var result = await _context.Reviews.Where(r => r.Labels == Label.Положительный).CountAsync(cancellationToken: cancellationToken);
        return Result.Success(result);
    }
    
    public async Task<Result<double>> GetPercentPositiveReviewInGroup(Guid groupId, CancellationToken cancellationToken, int neutralCoeff = 0)
    {
        var data = await _context.Reviews
            .Where(r => r.GroupId == groupId)
            .GroupBy(_ => 1)
            .Select(g => new
            {
                Total = g.Count(),
                Positive = g.Count(r => r.Labels == Label.Положительный),
                Neutral = g.Count(r => r.Labels == Label.Нейтральный)
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (data == null || data.Total == 0)
            return Result.Failure<double>("No records found for the specified group ID.");

        var percent = ((double)data.Positive + (double)data.Neutral * neutralCoeff) / data.Total * 100;
        return Result.Success(percent);
    }
    
    public async Task<Result<int>> GetLabelReviewCountInGroup(Guid groupId, CancellationToken 
        cancellationToken, Label label = Label.Положительный)
    {
        var result = await _context.Reviews.Where(r => r.Labels == label && r.GroupId == groupId).CountAsync(cancellationToken: cancellationToken);
        return Result.Success(result);
    }

    public async Task<Result<Dictionary<string, double>>> GetPositiveSrcPercentList(Guid groupId, CancellationToken cancellationToken)
    {
        var satisfactionBySrc = await _context.Reviews
            .Where(r => r.GroupId == groupId)
            .GroupBy(r => r.Src).Take(8)
            .Select(g => new
            {
                Src = g.Key,
                Percent = (g.Count(r => r.Labels == Label.Положительный) / (double)g.Count()) * 100
            })
            .ToDictionaryAsync(x => x.Src, x => x.Percent, cancellationToken);

        if (!satisfactionBySrc.Any())
            return Result.Failure<Dictionary<string, double>>("Empty List");

        return Result.Success(satisfactionBySrc);
    }
}