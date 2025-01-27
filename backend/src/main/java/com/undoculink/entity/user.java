@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;
    
    @Column(unique = true)
    private String username;
    
    private String publicKey;
    private String hashedPin;
    private String seedPhraseHash;
    private LocalDateTime createdAt;

    // Getters, setters, constructors
}