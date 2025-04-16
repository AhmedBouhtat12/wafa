package Wafaa.repository;

import Wafaa.model.Personner;
import io.micrometer.common.util.StringUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonnerRepo extends JpaRepository<Personner, Long> {

    StringUtils getAllById(long id);
}
