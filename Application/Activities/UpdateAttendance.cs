using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
  public class UpdateAttendance
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Guid Id { get; set; }

    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext dataContext;
      private readonly IUserAccessor userAccessor;

      public Handler(DataContext dataContext, IUserAccessor userAccessor)
      {
        this.dataContext = dataContext;
        this.userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await dataContext.Activities.Include(a => a.Attendees).ThenInclude(u => u.AppUser).FirstOrDefaultAsync(a => a.Id == request.Id);

        if (activity == null) return null;

        var user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

        if (user == null) return null;

        var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

        var attendence = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

        if (attendence != null && hostUserName == user.UserName)
        {
          activity.IsCancelled = !activity.IsCancelled;
        }

        if (attendence != null && hostUserName != user.UserName)       
        {
          activity.Attendees.Remove(attendence);
        }

        if (attendence == null)
        {
          attendence = new Domain.ActivityAttendee
          {
            AppUser = user,
            Activity = activity,
            IsHost = false
          };

          activity.Attendees.Add(attendence);
        }

        var result = await dataContext.SaveChangesAsync() > 0;

        return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
      }
    }
  }
}
