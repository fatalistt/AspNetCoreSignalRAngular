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
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else if (Environment.GetEnvironmentVariable("ASPNETCORE_BEHIND_HTTPS_PROXY") is null)
            {
                app.UseHsts();
            }

            if (Environment.GetEnvironmentVariable("ASPNETCORE_BEHIND_HTTPS_PROXY") is null)
                app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("");
            });
        }
    }
}
