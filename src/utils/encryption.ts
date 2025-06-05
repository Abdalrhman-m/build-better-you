
import { supabase } from '@/integrations/supabase/client';

export const encryptionUtils = {
  // Helper method to encrypt text using database function
  async encryptText(text: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .rpc('encrypt_text', { text_to_encrypt: text });

      if (error) {
        console.error('Error encrypting text:', error);
        return text; // Return original text if encryption fails
      }

      return data;
    } catch (error) {
      console.error('Unexpected error encrypting text:', error);
      return text; // Return original text if encryption fails
    }
  },

  // Helper method to decrypt text using database function
  async decryptText(encryptedText: string): Promise<string> {
    try {
      const { data, error } = await supabase
        .rpc('decrypt_text', { encrypted_text: encryptedText });

      if (error) {
        console.error('Error decrypting text:', error);
        return encryptedText; // Return original text if decryption fails
      }

      return data;
    } catch (error) {
      console.error('Unexpected error decrypting text:', error);
      return encryptedText; // Return original text if decryption fails
    }
  }
};
