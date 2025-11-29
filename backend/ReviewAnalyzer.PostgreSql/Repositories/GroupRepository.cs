using System.Text.RegularExpressions;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;
using ReviewAnalyzer.PostgreSql.Model;

namespace ReviewAnalyzer.PostgreSql.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly ReviewDbContext _context;

    public GroupRepository(ReviewDbContext context)
    {
        _context = context;
    }

    public async Task<Result<IEnumerable<ReviewGroupEntity>>> GetAllGroupsWithoutReviews()
    {
        var groupEntities = await _context.ReviewGroups
            .AsNoTracking()
            .ToListAsync();

        if (groupEntities.Count == 0)
            return Result.Failure<IEnumerable<ReviewGroupEntity>>("No groups found.");

        return Result.Success<IEnumerable<ReviewGroupEntity>>(groupEntities);
    }
    
    public async Task<Result> AddGroupAsync(ReviewGroupEntity groupEntity, CancellationToken cancellationToken)
    {
        var reviews = groupEntity.Reviews.ToList(); // копируем ревью
        groupEntity.Reviews.Clear();               // убираем из навигации

        await _context.ReviewGroups.AddAsync(groupEntity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

// Добавляем Reviews партиями
        const int batchSize = 1000;
        for (int i = 0; i < reviews.Count; i += batchSize)
        {
            var batch = reviews.Skip(i).Take(batchSize).ToList();
            await _context.Reviews.AddRangeAsync(batch, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }
        
        return Result.Success();
    }
}