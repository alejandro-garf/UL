# UndocuLink Project Overview  

UndocuLink is a career resource platform designed specifically for undocumented students, providing access to jobs, scholarships, and fellowships through a secure, privacy-focused application.  

## Core Technical Components  

### Technology Stack  
- **Frontend:** Next.js 14, TypeScript, React 18, Tailwind CSS, Framer Motion  
- **Backend:** Spring Boot 3.2, Java 21, REST API with OpenAPI/Swagger  
- **Database:** MySQL 8.0 (Relational schema)  
- **Containerization:** Podman  
- **CI/CD:** GitHub Actions  
- **Monitoring:** New Relic, ELK Stack  

## Current Implementation Status  

### ✅ Completed  
- Landing page with animations  
- Multi-step signup process UI  
- Authentication service backend  
- CORS configuration
- Frontend-backend integration for signup  
- Error handling implementation  
- Loading states  
- User feedback mechanisms
- Complete signup integration  
- Implement login page  
- Add session management  
- Create protected routes  
- Build dashboard

### 🔄 In Progress 
- Clean Up Interface
- Integrate real static data
  
### ⏭ Next Steps  
- AI & ML integrations  

## Architecture Details  

### Frontend Architecture  
- Next.js App Router structure  
- Server-Side Rendering (SSR)  
- Progressive Web App capabilities  
- Protected route wrappers  

### Backend Architecture  
- Layered architecture (Controllers, Services, Repositories)  
- Authentication middleware  
- Rate limiting implementation  
- Global error handling  

### Database Design  
- Relational schema with key tables like `users`  
- Optimized query patterns  
- Regular backups  

## Development Workflow  

### Backend Setup  
```bash
cd backend  
./mvnw spring-boot:run  
```
## Frontend Setup  

```bash
cd frontend  
npm install  
npm run dev
```
## Access Points  

- **Frontend:** [http://localhost:3000](http://localhost:3000)  
- **Backend API:** [http://localhost:8080](http://localhost:8080)



# Contributing to UndocuLink

The UndocuLink project welcomes contributions from developers. Here's a clear guide on how to contribute effectively:

## Contribution Process

1. **Fork the Repository**
   - Visit the UndocuLink GitHub repository
   - Click the "Fork" button in the upper right corner to create your copy

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/[your-username]/undoculink.git
   cd undoculink
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - Use descriptive branch names that reflect the feature or fix you're implementing

4. **Set Up Development Environment**
   - Follow the setup instructions in the "Getting Started" section
   - Ensure all prerequisites are installed (Node.js 20+, Java 21, MySQL 8.0, Podman)
   - Configure your local environment variables

5. **Make Your Changes**
   - Follow the existing code style and patterns
   - Write tests for new functionality
   - Keep commits small and focused on single issues

6. **Commit Your Changes**
   ```bash
   git commit -m "Add feature: brief description of changes"
   ```
   - Use clear, descriptive commit messages
   - Reference issue numbers if applicable (#123)

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Navigate to the original UndocuLink repository
   - Click "New Pull Request"
   - Select "compare across forks"
   - Select your fork and feature branch
   - Provide a clear description of your changes
   - Link related issues

9. **Code Review Process**
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Once approved, your changes will be merged

## Contribution Guidelines

- **Code Standards**
  - Frontend: TypeScript for all code with proper typing
  - Backend: Java 21 with Spring conventions
  - Follow existing patterns in the codebase

- **Testing Requirements**
  - Include unit tests for new functionality
  - Ensure all existing tests still pass

- **Documentation**
  - Update relevant documentation for new features
  - Add inline comments for complex logic

- **Security Considerations**
  - Follow the security-first approach of the project
  - No personal data storage
  - Proper input validation and sanitization

- **Performance**
  - Consider the performance impact of your changes
  - Adhere to established performance standards (page load < 3s, API response < 500ms)

## Getting Help

If you need assistance during the contribution process:
- Review existing documentation
- Check issue discussions for similar problems
- Reach out to maintainers through the project's communication channels

By following this contribution guide, you'll help maintain a high-quality codebase and ensure your contributions can be efficiently reviewed and merged.

