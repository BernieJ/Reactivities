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
  public class List
  {
    public class Query : IRequest<Result<List<ActivityDTO>>> { }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDTO>>>
    {
      private readonly DataContext _context;
      private readonly IMapper mapper;

      public Handler(DataContext context, IMapper mapper)
      {
        _context = context;
        this.mapper = mapper;
      }

      public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activities = await _context.Activities.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);

        return Result<List<ActivityDTO>>.Success(activities);
      }
    }
  }
}
