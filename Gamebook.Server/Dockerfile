FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5102

ENV ASPNETCORE_URLS=http://+:5102

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["Gamebook.Server/Gamebook.Server.csproj", "Gamebook.Server/"]
RUN dotnet restore "Gamebook.Server/Gamebook.Server.csproj"
COPY . .
WORKDIR "/src/Gamebook.Server"
RUN dotnet build "Gamebook.Server.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Gamebook.Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Gamebook.Server.dll"]
