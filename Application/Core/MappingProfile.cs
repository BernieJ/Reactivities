using Application.Activities;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Activity, Activity>();
      CreateMap<Activity, ActivityDTO>().ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

      CreateMap<ActivityAttendee, AttendeeDTO>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
        .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
        .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.isMain).Url));

      CreateMap<AppUser, Profiles.Profile>()
        .ForMember(d => d.Image,o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.isMain).Url));
        
    }
  }
}
