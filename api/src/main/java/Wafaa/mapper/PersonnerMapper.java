package Wafaa.mapper;


import Wafaa.dto.PersonnerDto;
import Wafaa.model.Personner;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonnerMapper {
    Personner toEntity(PersonnerDto personnerDTO);
    PersonnerDto toDto(Personner personner);
}
