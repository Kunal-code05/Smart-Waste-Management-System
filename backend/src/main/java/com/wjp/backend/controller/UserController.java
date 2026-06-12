package com.wjp.backend.controller;

import com.wjp.backend.model.Role;
import com.wjp.backend.model.User;
import com.wjp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // View All Staff
    @GetMapping("/staff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllStaff() {
        List<User> staff = userRepository.findAll()
                .stream()
                .filter(u -> u.getRole() == Role.ROLE_STAFF)
                .collect(Collectors.toList());

        return ResponseEntity.ok(staff);
    }

    // Add Staff
    @PostMapping("/staff")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> addStaff(@RequestBody User user) {

        user.setRole(Role.ROLE_STAFF);

        User savedUser = userRepository.save(user);
        user.setPassword(
        	    passwordEncoder.encode(user.getPassword())
        	);
        return ResponseEntity.ok(savedUser);
    }

    // Update Staff
    @PutMapping("/staff/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateStaff(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user = userRepository.findById(id).orElseThrow();

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());

        return ResponseEntity.ok(
                userRepository.save(user)
        );
    }

    // Delete Staff
    @DeleteMapping("/staff/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteStaff(
            @PathVariable Long id) {

        userRepository.deleteById(id);

        return ResponseEntity.ok("Staff Deleted");
    }
}