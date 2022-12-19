using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
  public class IsHostRequirement: IAuthorizationRequirement
  {
  }

  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
  {
    private readonly DataContext dbcontext;
    private readonly IHttpContextAccessor httpContext;

    public IsHostRequirementHandler(DataContext dbcontext, IHttpContextAccessor httpContext)
    {
      this.dbcontext = dbcontext;
      this.httpContext = httpContext;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
      var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (userId == null) return Task.CompletedTask;

      var activityId = Guid.Parse(httpContext.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

      var attendee = dbcontext.ActivityAttendees.AsNoTracking().SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId).Result;

      if(attendee == null) return Task.CompletedTask;

      if(attendee.IsHost) context.Succeed(requirement);

      return Task.CompletedTask;
    }
  }
}
