const API_URL = 'http://localhost:8080/api';

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export async function signUp(username: string, pin: string, seedPhrase: string) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        pin,
        seedPhrase,
        publicKey: generatePublicKey(seedPhrase), // We'll implement this
      }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return await response.json() as SignUpResponse;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

// Simple public key generation (you might want to use a proper crypto library)
function generatePublicKey(seedPhrase: string): string {
  return Buffer.from(seedPhrase).toString('hex').slice(0, 64);
}