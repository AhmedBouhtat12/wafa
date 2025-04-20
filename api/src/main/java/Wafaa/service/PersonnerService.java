package Wafaa.service;


import Wafaa.dto.PersonnerDto;
import Wafaa.mapper.PersonnerMapper;
import Wafaa.model.Personner;
import Wafaa.repository.PersonnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class PersonnerService  {

    @Autowired
    private  PersonnerRepo repository;

    @Autowired
    private  PersonnerMapper mapper;




    public PersonnerDto savePersonner(PersonnerDto dto) {
        Personner entity = mapper.toEntity(dto); // mapper ne doit PAS être null
        return mapper.toDto(repository.save(entity));
    }

    public PersonnerDto update(Long id, PersonnerDto dto) {
        Personner existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));
        existing.setName(dto.getName());
        existing.setAge(dto.getAge());
        existing.setEmail(dto.getEmail());
        existing.setPhone(dto.getPhone());
        existing.setAddress(dto.getAddress());
        return mapper.toDto(repository.save(existing));
    }


    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PersonnerDto getAllByIds(Long id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElse(null);
    }

    public List<PersonnerDto> getAll() {
        List<Personner> all = repository.findAll();
        return all.stream().map(mapper::toDto).collect(Collectors.toList());
    }


}