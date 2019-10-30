using System;
using fatalisttechs.Chat.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace fatalisttechs.Chat
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            bool isBehindHttpsProxy;
            {
                var var = Environment.GetEnvironmentVariable("ASPNETCORE_BEHIND_HTTPS_PROXY");
                isBehindHttpsProxy = var != null && var.ToLowerInvariant() != "false";
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else if (!isBehindHttpsProxy)
            {
                app.UseHsts();
            }

            if (!isBehindHttpsProxy)
                app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("");
            });
        }
    }
}
