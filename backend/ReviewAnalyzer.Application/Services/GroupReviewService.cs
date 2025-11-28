using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using CSharpFunctionalExtensions;
using CsvHelper;
using CsvHelper.Configuration;

namespace ReviewAnalyzer.Application.Services;

public class GroupReviewService : IGroupReviewService
{
    private readonly IProcessReview _processReview;

    public GroupReviewService(IProcessReview processReview)
    {
        _processReview = processReview;
    }

    public async Task<Result> AddGroupReview(byte[] csvBytes, string fileName, CancellationToken cancellationToken)
    {
        var csvResult = await _processReview.AnalyzeCsvAsync(csvBytes, fileName, cancellationToken);
        var input = ParseCsv(csvResult.Value);
        
        
        
        return Result.Success();
    }
    
    public List<ReviewInput> ParseCsv(byte[] bytes)
    {
        using var stream = new MemoryStream(bytes);
        using var reader = new StreamReader(stream);

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true,
            Delimiter = ","
        };

        using var csv = new CsvReader(reader, config);

        return csv.GetRecords<ReviewInput>().ToList();
    }
    
    public class ReviewInput
    {
        public int ID { get; set; }
        public string text { get; set; }
        public string src { get; set; }
        public string label { get; set; }
    }
}