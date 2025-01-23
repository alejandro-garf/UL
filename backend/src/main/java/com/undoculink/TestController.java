// Creates an API endpoint at http://localhost:8080/api/message

package com.undoculink;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/message")
    public String getMessage() {
        return "Hello from the Spring Boot backend!";
    }
}
