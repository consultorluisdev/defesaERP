using System.ComponentModel.DataAnnotations;
using DefesaCivil.Api.DTOs.Solicitacoes;

namespace DefesaCivil.Api.Tests;

public class SolicitacaoValidationTests
{
    [Fact]
    public void CreateDto_ComDadosValidos_NaoDeveTerErros()
    {
        var dto = new CreateSolicitacaoDto
        {
            Solicitante = "Maria Silva",
            Telefone = "(48) 99999-0000",
            Email = "maria@example.com",
            Tipo = DefesaCivil.Api.Entities.TipoSolicitacao.Informacao,
            Descricao = "Solicitação de informação.",
            Endereco = "Rua das Flores, 123",
            Bairro = "Centro",
            Municipio = "Florianópolis",
            Prioridade = DefesaCivil.Api.Entities.PrioridadeSolicitacao.Media,
            Observacoes = "Sem observações."
        };

        var errors = Validate(dto);

        Assert.Empty(errors);
    }

    [Fact]
    public void CreateDto_SemCamposObrigatorios_DeveRetornarErros()
    {
        var dto = new CreateSolicitacaoDto();

        var errors = Validate(dto);

        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Solicitante)));
        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Telefone)));
        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Tipo)));
        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Descricao)));
        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Endereco)));
        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Municipio)));
        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Prioridade)));
    }

    [Fact]
    public void CreateDto_ComEmailVazio_NaoDeveTerErroDeEmail()
    {
        var dto = new CreateSolicitacaoDto
        {
            Solicitante = "Maria Silva",
            Telefone = "(48) 99999-0000",
            Email = "",
            Tipo = DefesaCivil.Api.Entities.TipoSolicitacao.Outros,
            Descricao = "Solicitação.",
            Endereco = "Rua das Flores, 123",
            Municipio = "Florianópolis",
            Prioridade = DefesaCivil.Api.Entities.PrioridadeSolicitacao.Baixa
        };

        var errors = Validate(dto);

        Assert.DoesNotContain(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Email)));
    }

    [Fact]
    public void CreateDto_ComEmailInvalido_DeveRetornarErro()
    {
        var dto = new CreateSolicitacaoDto
        {
            Solicitante = "Maria Silva",
            Telefone = "(48) 99999-0000",
            Email = "email-invalido",
            Tipo = DefesaCivil.Api.Entities.TipoSolicitacao.Outros,
            Descricao = "Solicitação.",
            Endereco = "Rua das Flores, 123",
            Municipio = "Florianópolis",
            Prioridade = DefesaCivil.Api.Entities.PrioridadeSolicitacao.Baixa
        };

        var errors = Validate(dto);

        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(CreateSolicitacaoDto.Email)));
    }

    [Fact]
    public void UpdateDto_SemStatus_DeveRetornarErro()
    {
        var dto = new UpdateSolicitacaoDto
        {
            Solicitante = "Maria Silva",
            Telefone = "(48) 99999-0000",
            Tipo = DefesaCivil.Api.Entities.TipoSolicitacao.Outros,
            Descricao = "Solicitação.",
            Endereco = "Rua das Flores, 123",
            Municipio = "Florianópolis",
            Prioridade = DefesaCivil.Api.Entities.PrioridadeSolicitacao.Baixa
        };

        var errors = Validate(dto);

        Assert.Contains(errors, error => error.MemberNames.Contains(nameof(UpdateSolicitacaoDto.Status)));
    }

    private static List<ValidationResult> Validate(object dto)
    {
        var results = new List<ValidationResult>();
        Validator.TryValidateObject(dto, new ValidationContext(dto), results, validateAllProperties: true);
        return results;
    }
}
