// src/lib/api/auth.ts
const API_URL = 'http://localhost:8080/api';

export async function signUp(username: string, pin: string, seedPhrase: string): Promise<void> {
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
        publicKey: generatePublicKey(seedPhrase),
      }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

function generatePublicKey(seedPhrase: string): string {
  return Buffer.from(seedPhrase).toString('hex').slice(0, 64);
}