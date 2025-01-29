package com.undoculink.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web Configuration class for handling Cross-Origin Resource Sharing (CORS)
 * and other web-related configurations.
 */
@Configuration  // Indicates that this class provides configuration for the application
@EnableWebMvc   // Enables Spring MVC-specific configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures CORS (Cross-Origin Resource Sharing) settings for the application.
     * This is necessary to allow frontend applications from different domains
     * to access our API endpoints.
     *
     * @param registry The CorsRegistry to configure CORS settings
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")          // Applies CORS settings to all paths
                .allowedOrigins("http://localhost:3000")  // Allows requests from frontend development server
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");  // Allowed HTTP methods
    }
}