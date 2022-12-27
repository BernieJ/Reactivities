using Application.Core;
using Application.Interfaces;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Activities;
using FluentValidation;

namespace Application.Profiles
{
  public class Edit
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string DisplayName { get; set; }
      public string Bio { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.DisplayName).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly UserManager<AppUser> userManager;
      private readonly IUserAccessor userAccessor;

      public Handler( UserManager<AppUser> userManager, IUserAccessor userAccessor)
      {
        this.userManager = userManager;
        this.userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await userManager.FindByNameAsync(userAccessor.GetUserName());

        if (user == null) return null; 

        user.Bio = request.Bio;
        user.DisplayName = request.DisplayName;

        await userManager.UpdateAsync(user);

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}
