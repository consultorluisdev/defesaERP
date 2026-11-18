# backend/DefesaCivil.Api/Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copiar csproj e restaurar dependências
COPY *.csproj .
RUN dotnet restore

# Copiar tudo e buildar
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .

# Expor porta
EXPOSE 8080

# Render injeta PORT (padrão 10000); localmente cai no 8080
ENTRYPOINT ["sh", "-c", "ASPNETCORE_URLS=http://+:${PORT:-8080} exec dotnet DefesaCivil.Api.dll"]
