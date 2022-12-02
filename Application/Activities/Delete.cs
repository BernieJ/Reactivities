using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
  public class Delete
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _dataContext;
      private readonly IMapper _mapper;

      public Handler(DataContext dataContext, IMapper mapper)
      {
        _dataContext = dataContext;
        _mapper = mapper;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _dataContext.Activities.FindAsync(request.Id);

        _dataContext.Activities.Remove(activity);
        await _dataContext.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}
