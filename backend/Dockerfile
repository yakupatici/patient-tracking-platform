# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore
COPY ["PatientTracking.API/PatientTracking.API.csproj", "PatientTracking.API/"]
COPY ["PatientTracking.Core/PatientTracking.Core.csproj", "PatientTracking.Core/"]
RUN dotnet restore "PatientTracking.API/PatientTracking.API.csproj"

# Copy everything else and build
COPY . .
WORKDIR /src/PatientTracking.API
RUN dotnet build -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["dotnet", "PatientTracking.API.dll"]
