using System;
using DefesaCivil.Api.Common;
using Xunit;

namespace DefesaCivil.Api.Tests
{
    public class DateTimeUtcTests
    {
        [Fact]
        public void Normalize_Unspecified_AssumesUtc()
        {
            var input = new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Unspecified);
            var result = DateTimeUtc.Normalize(input);

            Assert.Equal(DateTimeKind.Utc, result.Kind);
            Assert.Equal(new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Utc), result);
        }

        [Fact]
        public void Normalize_Utc_KeepsSameValue()
        {
            var input = new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Utc);
            var result = DateTimeUtc.Normalize(input);

            Assert.Equal(DateTimeKind.Utc, result.Kind);
            Assert.Equal(input, result);
        }

        [Fact]
        public void Normalize_Local_ConvertsToUtc()
        {
            var local = new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Local);
            var result = DateTimeUtc.Normalize(local);

            Assert.Equal(DateTimeKind.Utc, result.Kind);
            Assert.Equal(local.ToUniversalTime(), result);
        }

        [Fact]
        public void Normalize_Null_ReturnsNull()
        {
            DateTime? input = null;
            var result = DateTimeUtc.Normalize(input);

            Assert.Null(result);
        }

        [Fact]
        public void Normalize_NullableWithValue_Normalizes()
        {
            DateTime? input = new DateTime(2026, 11, 21, 22, 0, 0, DateTimeKind.Unspecified);
            var result = DateTimeUtc.Normalize(input);

            Assert.NotNull(result);
            Assert.Equal(DateTimeKind.Utc, result!.Value.Kind);
        }
    }
}
