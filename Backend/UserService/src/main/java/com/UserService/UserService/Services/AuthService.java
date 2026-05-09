package com.UserService.UserService.Services;

import com.UserService.UserService.DTO.RegisterDTO;
import com.UserService.UserService.ENUMS.Role;
import com.UserService.UserService.Entity.User;
import com.UserService.UserService.Repository.UserRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.UserService.UserService.Exceptions.BadRequestException;
import com.UserService.UserService.Exceptions.ResourceNotFoundException;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtService jwtService;

    @Transactional
    public String register(RegisterDTO dto) {
        if (repo.findByEmail(dto.email).isPresent()) {
            throw new BadRequestException("Email is already in use!");
        }

        if (!dto.password.equals(dto.Confirmpassword)) {
            throw new BadRequestException("Passwords do not match!");
        }

        User user = new User();
        user.setUsername(dto.username);
        user.setEmail(dto.email);
        user.setPassword(encoder.encode(dto.password));
        user.setRole(dto.getRole());
        if (dto.getRole() == Role.EMPLOYEE) {
            user.setApproved(false);
        } else {
            user.setApproved(true);
        }

        repo.save(user);
        if (dto.getRole() == Role.EMPLOYEE) {
            return "Waiting for admin approval";
        }

        return "User registered successfully";
    }

    public String approveEmployee(Long userId) {
        User user = repo.findByIdAndRole(userId, Role.EMPLOYEE)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        user.setApproved(true);
        repo.save(user);
        return "Employee approved successfully";
    }

    public String rejectEmployee(Long userId) {
        User user = repo.findByIdAndRole(userId, Role.EMPLOYEE)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
user.setRejected(true);
    user.setApproved(false);
    repo.save(user);
            return "Employee rejected and removed successfully";
    }

public List<User> getPendingEmployees() {
    return repo.findAll().stream()
            .filter(user -> 
                user.getRole() == Role.EMPLOYEE && 
                !user.isApproved() && 
                !user.isRejected() 
            )
            .toList();
}
    public String login(String email, String password) {
      User user = repo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("USER_NOT_FOUND"));

    // 1. فحص لو الحساب مرفوض
    if (user.isRejected()) {
        repo.delete(user);
        throw new RuntimeException("Employee account is rejected approval");
    }

    // 2. فحص لو الحساب لسه منتظر موافقة (زي ما كان عندك)
    if (user.getRole() == Role.EMPLOYEE && !user.isApproved()) {
        throw new RuntimeException("Employee account is pending approval");
    }

    // 3. فحص الباسورد
    if (!encoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return jwtService.generateToken(user.getEmail(), user.getRole(), user.getId());
    }

}