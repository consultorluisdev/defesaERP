using System;

namespace DefesaCivil.Api.Common
{
    /// <summary>
    /// Normaliza datas para UTC antes de persistir ou devolver na API.
    /// Evita que DateTime com Kind=Unspecified quebre o Npgsql
    /// (timestamp with time zone) e mantem consistencia entre ambientes.
    /// </summary>
    public static class DateTimeUtc
    {
        public static DateTime Normalize(DateTime value) =>
            value.Kind == DateTimeKind.Unspecified
                ? DateTime.SpecifyKind(value, DateTimeKind.Utc)
                : value.ToUniversalTime();

        public static DateTime? Normalize(DateTime? value) =>
            value.HasValue ? Normalize(value.Value) : null;
    }
}
