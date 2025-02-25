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

## Key Features  

### User Authentication System  
- 12-word mnemonic seed phrase generation for account recovery  
- 4-digit PIN authentication (hashed with SHA-256)  
- JWT-based session management (15-min access tokens, 7-day refresh tokens)  
- Zero personal data storage policy  

### Resource Hub  
- Job postings with search/filter capabilities  
- Scholarship listings with eligibility criteria  
- Fellowship programs with timeline tracking  

### AI Career Assistant  
- Resume analysis and feedback  
- Career path suggestions  
- Skills gap analysis  
- Interview preparation  

### Security Implementation  
- HTTPS encryption  
- Rate limiting (20 requests per minute per user)  
- Data encryption at rest  
- Regular security audits  
- No storage of raw seed phrases  

## Current Implementation Status  

### ✅ Completed  
- Development environment setup  
- Next.js project initialization  
- Spring Boot application setup  
- Database configuration  
- Basic API structure  
- Landing page with animations  
- Multi-step signup process UI  
- Authentication service backend  
- CORS configuration  

### 🔄 In Progress  
- Frontend-backend integration for signup  
- Error handling implementation  
- Loading states  
- User feedback mechanisms  

### ⏭ Next Steps  
- Complete signup integration  
- Implement login page  
- Add session management  
- Create protected routes  
- Build dashboard  
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

