using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReviewAnalyzer.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class reviewCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReviewCount",
                table: "ReviewGroup",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewCount",
                table: "ReviewGroup");
        }
    }
}
