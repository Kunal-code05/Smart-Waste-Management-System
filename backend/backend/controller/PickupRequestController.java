package com.wjp.backend.controller;

import com.wjp.backend.model.PickupRequest;
import com.wjp.backend.model.User;
import com.wjp.backend.repository.PickupRequestRepository;
import com.wjp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/pickups")
public class PickupRequestController {

    @Autowired
    private PickupRequestRepository pickupRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<PickupRequest>> getAllPickupRequests(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        
        if (user.getRole().name().equals("ROLE_ADMIN")) {
            return ResponseEntity.ok(pickupRequestRepository.findAll());
        } else if (user.getRole().name().equals("ROLE_STAFF")) {
            return ResponseEntity.ok(pickupRequestRepository.findByAssignedStaffId(user.getId()));
        } else {
            return ResponseEntity.ok(pickupRequestRepository.findByCitizenId(user.getId()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<PickupRequest> createPickupRequest(@RequestBody PickupRequest pickupRequest, Principal principal) {
        User citizen = userRepository.findByUsername(principal.getName()).orElseThrow();
        pickupRequest.setCitizen(citizen);
        pickupRequest.setStatus("SCHEDULED");
        return ResponseEntity.ok(pickupRequestRepository.save(pickupRequest));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<PickupRequest> updateStatus(@PathVariable Long id, @RequestBody PickupRequest updateData) {
        PickupRequest request = pickupRequestRepository.findById(id).orElseThrow();
        request.setStatus(updateData.getStatus());
        return ResponseEntity.ok(pickupRequestRepository.save(request));
    }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PickupRequest> assignStaff(@PathVariable Long id, @RequestParam Long staffId) {
        PickupRequest request = pickupRequestRepository.findById(id).orElseThrow();
        User staff = userRepository.findById(staffId).orElseThrow();
        request.setAssignedStaff(staff);
        return ResponseEntity.ok(pickupRequestRepository.save(request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePickupRequest(@PathVariable Long id) {
        pickupRequestRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
