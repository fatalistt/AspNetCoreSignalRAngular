FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-alpine AS build
WORKDIR /src
COPY ["src", "./"]
RUN dotnet build "Chat.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Chat.csproj" -c Release -o /app/publish

FROM base AS release
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Chat.dll"]

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-alpine AS debug
WORKDIR /src
EXPOSE 80
EXPOSE 443
RUN apk --no-cache add procps
RUN wget https://aka.ms/getvsdbgsh -O - 2>/dev/null | /bin/sh /dev/stdin -v latest -l /vsdbg
ENTRYPOINT ["dotnet", "watch", "run"]