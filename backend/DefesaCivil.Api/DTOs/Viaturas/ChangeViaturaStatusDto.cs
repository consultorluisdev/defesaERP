using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Viaturas
{
    public class ChangeViaturaStatusDto
    {
        [Required]
        [StringLength(30)]
        public string Status { get; set; } = string.Empty;
    }
}
