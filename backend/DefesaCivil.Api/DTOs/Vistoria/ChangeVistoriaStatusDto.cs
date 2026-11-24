using System.ComponentModel.DataAnnotations;

namespace DefesaCivil.Api.DTOs.Vistorias
{
    public class ChangeVistoriaStatusDto
    {
        [Required]
        [StringLength(30)]
        public string Status { get; set; } = string.Empty;
    }
}
