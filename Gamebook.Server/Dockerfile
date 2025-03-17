FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5102

ENV ASPNETCORE_URLS=http://+:5102

USER app

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

COPY ["Gamebook.Server/Gamebook.Server.csproj", "Gamebook.Server/"]
COPY ["gamebook.client/gamebook.client.esproj", "gamebook.client/"]
RUN dotnet restore "Gamebook.Server/Gamebook.Server.csproj"
COPY . .
WORKDIR "/src/Gamebook.Server"
RUN dotnet build "Gamebook.Server.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "Gamebook.Server.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# Print the contents of the /app/publish directory
RUN ls -la /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Gamebook.Server.dll"]
