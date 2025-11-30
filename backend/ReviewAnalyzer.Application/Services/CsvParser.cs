using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;

namespace ReviewAnalyzer.Application.Services;

public class CsvParser
{
    public static List<GroupReviewService.ReviewInput> ParseCsv(byte[] bytes)
    {
        using var stream = new MemoryStream(bytes);
        using var reader = new StreamReader(stream);

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true,
            Delimiter = ","
        };

        using var csv = new CsvReader(reader, config);

        return csv.GetRecords<GroupReviewService.ReviewInput>().ToList();
    }
}