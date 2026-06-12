package com.wjp.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wjp.backend.model.Role;
import com.wjp.backend.model.User;
import com.wjp.backend.repository.ComplaintRepository;
import com.wjp.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private ComplaintRepository complaintRepository;

    @GetMapping("/staff")
    public List<User> getAllStaff() {
        return userRepository.findAll()
                .stream()
                .filter(u -> u.getRole() == Role.ROLE_STAFF)
                .toList();
    }

    @PostMapping("/staff")
    public User addStaff(@RequestBody User user) {

        user.setRole(Role.ROLE_STAFF);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @PutMapping("/staff/{id}")
    public User updateStaff(
            @PathVariable Long id,
            @RequestBody User updated) {

        User staff = userRepository.findById(id).orElseThrow();

        staff.setUsername(updated.getUsername());
        staff.setEmail(updated.getEmail());

        return userRepository.save(staff);
    }

    @DeleteMapping("/staff/{id}")
    public String deleteStaff(@PathVariable Long id) {

        userRepository.deleteById(id);

        return "Staff Deleted";
        
        
        
        
    }
    @GetMapping("/stats")
    public Map<String,Object> getStats() {

        Map<String,Object> stats = new HashMap<>();

        stats.put("totalUsers",
                userRepository.count());

        stats.put("totalStaff",
                userRepository.findAll()
                .stream()
                .filter(u -> u.getRole()==Role.ROLE_STAFF)
                .count());

        stats.put("totalCitizens",
                userRepository.findAll()
                .stream()
                .filter(u -> u.getRole()==Role.ROLE_CITIZEN)
                .count());

        stats.put("totalComplaints",
        		complaintRepository.count());

        stats.put("pendingComplaints",
                complaintRepository.findAll()
                .stream()
                .filter(c -> c.getStatus().equals("PENDING"))
                .count());

        stats.put("resolvedComplaints",
                complaintRepository.findAll()
                .stream()
                .filter(c -> c.getStatus().equals("RESOLVED"))
                .count());

        return stats;
    }
    
    
   
}