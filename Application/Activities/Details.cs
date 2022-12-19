using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
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
  public class Details
  {
    public class Query : IRequest<Result<ActivityDTO>>
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ActivityDTO>>
    {
      private readonly DataContext _context;
      private readonly IMapper mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _context = context;
        this.mapper = mapper;
      }

      public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Id);

        return Result<ActivityDTO>.Success(activity);
      }
    }
  }
}
