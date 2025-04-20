package Wafaa.controller;

import Wafaa.dto.PersonnerDto;
import Wafaa.repository.PersonnerRepo;
import Wafaa.service.PersonnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/personner")
public class PersonnerController {

    @Autowired
    private PersonnerService personnerService;

    @Autowired
    private PersonnerRepo personnerRepo;

    @GetMapping
    @PreAuthorize("hasAnyRole('Role_Admin', 'Role_Consultation')")
    public ResponseEntity<List<PersonnerDto>> getAllPersonners() {
        return ResponseEntity.ok(personnerService.getAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('Role_Admin', 'Role_Consultation')")
    public ResponseEntity<PersonnerDto> getPersonnerById(@PathVariable Long id) {
        PersonnerDto dto = personnerService.getAllByIds(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('Role_Admin')")
    public ResponseEntity<PersonnerDto> create(@RequestBody PersonnerDto personnerDto) {
        return ResponseEntity.ok(personnerService.savePersonner(personnerDto));
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasRole('Role_Admin')")
    public ResponseEntity<PersonnerDto> update(@PathVariable Long id, @RequestBody PersonnerDto personnerDto) {
        PersonnerDto updated = personnerService.update(id, personnerDto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delet/{id}")
    @PreAuthorize("hasRole('Role_Admin')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personnerService.delete(id);
        return ResponseEntity.ok().build();
    }
}
