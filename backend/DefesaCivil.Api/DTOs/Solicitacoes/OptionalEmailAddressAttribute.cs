using System;
using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Solicitacoes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public sealed class OptionalEmailAddressAttribute : ValidationAttribute
    {
        private static readonly EmailAddressAttribute Inner = new();

        public override bool IsValid(object? value)
        {
            if (value is null)
                return true;

            if (value is string text && string.IsNullOrWhiteSpace(text))
                return true;

            return Inner.IsValid(value);
        }
    }
}
