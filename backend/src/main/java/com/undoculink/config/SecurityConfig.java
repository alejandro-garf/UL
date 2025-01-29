package com.undoculink.config;

import com.undoculink.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security Configuration class for setting up authentication and authorization.
 * This class defines the security rules and JWT authentication setup.
 */
@Configuration
@EnableWebSecurity  // Enables Spring Security's web security support
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;  // Custom JWT authentication filter

    /**
     * Configures the security filter chain for HTTP requests.
     * This defines which endpoints are public, which require authentication,
     * and how authentication should be handled.
     *
     * @param http The HttpSecurity object to configure
     * @return The configured SecurityFilterChain
     * @throws Exception if there's an error in configuration
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disables CSRF protection as we're using JWT
            .authorizeHttpRequests(auth -> auth
                // Public endpoints that don't require authentication
                .requestMatchers("/api/users/register", "/api/users/login", "/api/users/refresh-token").permitAll()
                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Use stateless sessions for JWT
            .and()
            // Add JWT filter before the standard authentication filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}