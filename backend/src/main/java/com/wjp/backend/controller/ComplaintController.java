package com.wjp.backend.controller;

import com.wjp.backend.model.Complaint;
import com.wjp.backend.model.User;
import com.wjp.backend.repository.ComplaintRepository;
import com.wjp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        
        if (user.getRole().name().equals("ROLE_ADMIN")) {
            return ResponseEntity.ok(complaintRepository.findAll());
        } else if (user.getRole().name().equals("ROLE_STAFF")) {
            return ResponseEntity.ok(complaintRepository.findByAssignedStaffId(user.getId()));
        } else {
            return ResponseEntity.ok(complaintRepository.findByCitizenId(user.getId()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint, Principal principal) {
        User citizen = userRepository.findByUsername(principal.getName()).orElseThrow();
        complaint.setCitizen(citizen);
        complaint.setStatus("PENDING");
        return ResponseEntity.ok(complaintRepository.save(complaint));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestBody Complaint updateData) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow();
        complaint.setStatus(updateData.getStatus());
        return ResponseEntity.ok(complaintRepository.save(complaint));
    }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Complaint> assignStaff(@PathVariable Long id, @RequestParam Long staffId) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow();
        User staff = userRepository.findById(staffId).orElseThrow();
        complaint.setAssignedStaff(staff);
        return ResponseEntity.ok(complaintRepository.save(complaint));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteComplaint(@PathVariable Long id) {
        complaintRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
