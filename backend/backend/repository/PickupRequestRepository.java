package com.wjp.backend.repository;

import com.wjp.backend.model.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
    List<PickupRequest> findByCitizenId(Long citizenId);
    List<PickupRequest> findByAssignedStaffId(Long staffId);
}
