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

namespace Application.Photos
{
  public class Delete
  {
    public class Command: IRequest<Result<Unit>>
    {
      public string Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext dataContext;
      private readonly IPhotoAccessor photoAccessor;
      private readonly IUserAccessor userAccessor;

      public Handler(DataContext dataContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
      {
        this.dataContext = dataContext;
        this.photoAccessor = photoAccessor;
        this.userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await dataContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUserName());

        if (user == null) return null;

        var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

        if (photo == null) return null;

        if (photo.isMain) return Result<Unit>.Failure("You cannot delete your main photo");

        var result = await photoAccessor.DeletePhoto(photo.Id);

        if (result == null) return Result<Unit>.Failure("Problem deleting from cloudinary"); 

        user.Photos.Remove(photo);

        var success = await dataContext.SaveChangesAsync() > 0;

        if (success) return Result<Unit>.Success(Unit.Value);

        return Result<Unit>.Failure("Problem deleting from API");
      }
    }
  }
}
