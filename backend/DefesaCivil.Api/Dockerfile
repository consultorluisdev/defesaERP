# backend/DefesaCivil.Api/Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar csproj e restaurar dependências
COPY *.csproj .
RUN dotnet restore

# Copiar tudo e buildar
COPY . .
RUN dotnet publish -c Release -o /app

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Expor porta
EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "DefesaCivil.Api.dll"]
